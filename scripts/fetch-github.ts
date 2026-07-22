import { mkdir, access, writeFile } from "node:fs/promises";
import path from "node:path";
import { siteConfig } from "@/config";
import { rankAll, rankRepos } from "@/lib/rank";
import type { GithubData, RankableRepo } from "@/lib/types";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT_PATH = path.join(ROOT, "src/data/github.json");
const API = "https://api.github.com";
const CONCURRENCY = 5;
const USERNAME = siteConfig.githubUsername;
const DENYLIST = [...siteConfig.repoDenylist];

type GhRepo = {
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  size: number;
  language: string | null;
  topics?: string[];
  pushed_at: string;
  homepage: string | null;
  html_url: string;
  fork: boolean;
  owner: { login: string };
};

type GhUser = {
  login: string;
  avatar_url: string;
  followers: number;
  following: number;
  public_repos: number;
  html_url: string;
};

type ContributionLevel =
  | "NONE"
  | "FIRST_QUARTILE"
  | "SECOND_QUARTILE"
  | "THIRD_QUARTILE"
  | "FOURTH_QUARTILE";

const LEVEL_MAP: Record<ContributionLevel, 0 | 1 | 2 | 3 | 4> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

function authHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "engineer-portfolio-fetch",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

async function ghFetch(url: string, init?: RequestInit): Promise<Response> {
  const res = await fetch(url, {
    ...init,
    headers: { ...authHeaders(), ...(init?.headers ?? {}) },
  });
  if (res.status === 403 || res.status === 429) {
    const remaining = res.headers.get("x-ratelimit-remaining");
    const reset = res.headers.get("x-ratelimit-reset");
    throw new Error(
      `GitHub rate limited (${res.status}) remaining=${remaining} reset=${reset} url=${url}`,
    );
  }
  return res;
}

async function ghJson<T>(url: string): Promise<T> {
  const res = await ghFetch(url);
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`GET ${url} → ${res.status}: ${body.slice(0, 200)}`);
  }
  return (await res.json()) as T;
}

async function mapPool<T, R>(
  items: T[],
  concurrency: number,
  fn: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const results = new Array<R>(items.length);
  let next = 0;
  async function worker() {
    while (true) {
      const i = next++;
      if (i >= items.length) return;
      results[i] = await fn(items[i], i);
    }
  }
  const n = Math.min(concurrency, Math.max(1, items.length));
  await Promise.all(Array.from({ length: n }, () => worker()));
  return results;
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

/** Approximate commit count via Link header last page (per_page=1, since 1y). */
async function fetchCommitCountViaCommitsList(
  owner: string,
  repo: string,
): Promise<number> {
  const since = new Date();
  since.setFullYear(since.getFullYear() - 1);
  const url = `${API}/repos/${owner}/${repo}/commits?since=${since.toISOString()}&per_page=1`;
  const res = await ghFetch(url);
  if (res.status === 409 || res.status === 404) return 0; // empty repo
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`commits ${owner}/${repo} → ${res.status}: ${body.slice(0, 120)}`);
  }
  const link = res.headers.get("link");
  if (link) {
    const last = [...link.matchAll(/[?&]page=(\d+)>;\s*rel="last"/g)].pop();
    if (last) return Number(last[1]);
  }
  const body = (await res.json()) as unknown[];
  return Array.isArray(body) ? body.length : 0;
}

async function fetchLanguages(
  owner: string,
  repo: string,
): Promise<Record<string, number>> {
  return ghJson<Record<string, number>>(
    `${API}/repos/${owner}/${repo}/languages`,
  );
}

type Participation = { owner: number[]; all: number[] };

async function fetchParticipation(
  owner: string,
  repo: string,
): Promise<Participation | null> {
  const url = `${API}/repos/${owner}/${repo}/stats/participation`;
  for (let attempt = 0; attempt < 4; attempt++) {
    const res = await ghFetch(url);
    if (res.status === 202) {
      await sleep(500 * (attempt + 1));
      continue;
    }
    if (res.status === 204 || !res.ok) return null;
    const data = (await res.json()) as { owner?: number[]; all?: number[] };
    return {
      owner: data.owner ?? [],
      all: data.all ?? [],
    };
  }
  return null;
}

async function fetchAllRepos(login: string): Promise<GhRepo[]> {
  const repos: GhRepo[] = [];
  let page = 1;
  while (true) {
    const batch = await ghJson<GhRepo[]>(
      `${API}/users/${login}/repos?per_page=100&type=owner&sort=updated&page=${page}`,
    );
    repos.push(...batch);
    if (batch.length < 100) break;
    page += 1;
  }
  return repos;
}

function weekStarts(count: number): string[] {
  const weeks: string[] = [];
  const now = new Date();
  // Align to Sunday (GitHub participation weeks end on the current week).
  const end = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  );
  end.setUTCDate(end.getUTCDate() - end.getUTCDay());
  for (let i = count - 1; i >= 0; i--) {
    const d = new Date(end);
    d.setUTCDate(end.getUTCDate() - i * 7);
    weeks.push(d.toISOString().slice(0, 10));
  }
  return weeks;
}

async function fetchContributionWeeks(
  login: string,
): Promise<GithubData["contributionWeeks"]> {
  try {
    const res = await ghFetch(`${API}/graphql`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query($login: String!) {
            user(login: $login) {
              contributionsCollection {
                contributionCalendar {
                  weeks {
                    contributionDays {
                      date
                      contributionCount
                      contributionLevel
                    }
                  }
                }
              }
            }
          }
        `,
        variables: { login },
      }),
    });
    if (!res.ok) {
      console.warn(
        `[fetch-github] GraphQL contributions unavailable (${res.status}); skipping calendar`,
      );
      return [];
    }
    const json = (await res.json()) as {
      data?: {
        user?: {
          contributionsCollection?: {
            contributionCalendar?: {
              weeks?: {
                contributionDays: {
                  date: string;
                  contributionCount: number;
                  contributionLevel: ContributionLevel;
                }[];
              }[];
            };
          };
        };
      };
      errors?: { message: string }[];
    };
    if (json.errors?.length || !json.data?.user) {
      console.warn(
        `[fetch-github] GraphQL contributions skipped: ${json.errors?.[0]?.message ?? "no user"}`,
      );
      return [];
    }
    const weeks =
      json.data.user.contributionsCollection?.contributionCalendar?.weeks ?? [];
    return weeks.flatMap((w) =>
      w.contributionDays.map((d) => ({
        date: d.date,
        count: d.contributionCount,
        level: LEVEL_MAP[d.contributionLevel] ?? 0,
      })),
    );
  } catch (err) {
    console.warn(
      `[fetch-github] GraphQL contributions failed; skipping calendar:`,
      err instanceof Error ? err.message : err,
    );
    return [];
  }
}

async function buildGithubData(): Promise<GithubData> {
  console.log(`[fetch-github] fetching profile + repos for ${USERNAME}`);
  const [user, repos] = await Promise.all([
    ghJson<GhUser>(`${API}/users/${USERNAME}`),
    fetchAllRepos(USERNAME),
  ]);

  const owned = repos.filter((r) => !r.fork);
  console.log(
    `[fetch-github] ${repos.length} repos (${owned.length} non-fork); enriching (concurrency ${CONCURRENCY})`,
  );

  const languages: Record<string, number> = {};
  const activityBuckets = new Array<number>(52).fill(0);

  const enriched = await mapPool(owned, CONCURRENCY, async (repo) => {
    const owner = repo.owner.login;
    const [langs, participation] = await Promise.all([
      fetchLanguages(owner, repo.name),
      fetchParticipation(owner, repo.name),
    ]);

    for (const [lang, bytes] of Object.entries(langs)) {
      languages[lang] = (languages[lang] ?? 0) + bytes;
    }

    let commitCount: number;
    if (participation && (participation.owner.length || participation.all.length)) {
      const series = participation.owner.length
        ? participation.owner
        : participation.all;
      commitCount = series.reduce((a, b) => a + b, 0);
      const all = participation.all.length ? participation.all : series;
      const offset = 52 - all.length;
      for (let i = 0; i < all.length; i++) {
        activityBuckets[offset + i] += all[i];
      }
    } else {
      commitCount = await fetchCommitCountViaCommitsList(owner, repo.name);
    }

    const rankable: RankableRepo = {
      name: repo.name,
      description: repo.description,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      size: repo.size,
      language: repo.language,
      topics: repo.topics ?? [],
      pushed_at: repo.pushed_at,
      commitCount,
      homepage: repo.homepage,
      html_url: repo.html_url,
      fork: repo.fork,
    };
    return rankable;
  });

  // Include forks in the raw list for ranking filter (rank helpers exclude forks).
  const allRankable: RankableRepo[] = [
    ...enriched,
    ...repos
      .filter((r) => r.fork)
      .map(
        (repo): RankableRepo => ({
          name: repo.name,
          description: repo.description,
          stargazers_count: repo.stargazers_count,
          forks_count: repo.forks_count,
          size: repo.size,
          language: repo.language,
          topics: repo.topics ?? [],
          pushed_at: repo.pushed_at,
          commitCount: 0,
          homepage: repo.homepage,
          html_url: repo.html_url,
          fork: true,
        }),
      ),
  ];

  const topProjects = rankRepos(allRankable, { top: 6, denylist: DENYLIST });
  const allProjects = rankAll(allRankable, { denylist: DENYLIST });

  const scoredNonFork = allProjects;
  const totalStars = scoredNonFork.reduce((s, r) => s + r.stargazers_count, 0);
  const totalForks = scoredNonFork.reduce((s, r) => s + r.forks_count, 0);

  const weekLabels = weekStarts(52);
  const commitActivity = weekLabels.map((week, i) => ({
    week,
    count: activityBuckets[i] ?? 0,
  }));

  const contributionWeeks = await fetchContributionWeeks(USERNAME);

  const data: GithubData = {
    profile: {
      login: user.login,
      avatarUrl: user.avatar_url,
      followers: user.followers,
      following: user.following,
      publicRepos: user.public_repos,
      htmlUrl: user.html_url,
    },
    topProjects,
    allProjects,
    stats: { totalStars, totalForks },
    languages,
    commitActivity,
    contributionWeeks,
    fetchedAt: new Date().toISOString(),
  };

  if (data.topProjects.length !== 6) {
    console.warn(
      `[fetch-github] expected topProjects.length === 6, got ${data.topProjects.length}`,
    );
  }

  return data;
}

async function fileExists(p: string): Promise<boolean> {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  try {
    const data = await buildGithubData();
    await mkdir(path.dirname(OUT_PATH), { recursive: true });
    await writeFile(OUT_PATH, `${JSON.stringify(data, null, 2)}\n`, "utf8");
    console.log(
      `[fetch-github] wrote ${OUT_PATH} (topProjects=${data.topProjects.length}, allProjects=${data.allProjects.length}, contributions=${data.contributionWeeks.length})`,
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (await fileExists(OUT_PATH)) {
      console.warn(
        `[fetch-github] fetch failed; keeping existing github.json: ${message}`,
      );
      process.exit(0);
    }
    console.error(`[fetch-github] fetch failed and no seed exists: ${message}`);
    process.exit(1);
  }
}

main();
