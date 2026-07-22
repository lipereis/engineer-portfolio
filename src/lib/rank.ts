import type { RankableRepo, ScoredRepo } from "./types";

const BOOSTED_LANGUAGES = ["TypeScript", "JavaScript", "Python"];

export function scoreRepo(repo: RankableRepo, now = new Date()): number {
  const starsForks = Math.min(1, (repo.stargazers_count + repo.forks_count * 2) / 50);
  const commits = Math.min(1, repo.commitCount / 80);
  const descLen = repo.description?.trim().length ?? 0;
  const description = Math.min(1, descLen / 80);
  const topics = Math.min(1, (repo.topics?.length ?? 0) / 5);
  const lang = !repo.language
    ? 0
    : BOOSTED_LANGUAGES.includes(repo.language)
      ? 1
      : 0.5;
  const size = Math.min(1, repo.size / 2000);
  const days = Math.max(
    0,
    (now.getTime() - new Date(repo.pushed_at).getTime()) / (1000 * 60 * 60 * 24),
  );
  const recency = Math.max(0, 1 - days / 365);
  return (
    (starsForks * 0.15 +
      commits * 0.25 +
      description * 0.15 +
      topics * 0.1 +
      lang * 0.1 +
      size * 0.1 +
      recency * 0.15) *
    100
  );
}

function filterAndScore(
  repos: RankableRepo[],
  denylist: string[] = [],
): ScoredRepo[] {
  const deny = new Set(denylist);
  return repos
    .filter((r) => !r.fork && !deny.has(r.name))
    .map((r) => ({ ...r, score: scoreRepo(r) }))
    .sort((a, b) => b.score - a.score);
}

export function rankRepos(
  repos: RankableRepo[],
  opts: { top?: number; denylist?: string[] } = {},
): ScoredRepo[] {
  const top = opts.top ?? 6;
  return filterAndScore(repos, opts.denylist).slice(0, top);
}

export function rankAll(
  repos: RankableRepo[],
  opts: { denylist?: string[] } = {},
): ScoredRepo[] {
  return filterAndScore(repos, opts.denylist);
}
