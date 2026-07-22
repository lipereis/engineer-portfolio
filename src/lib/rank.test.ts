import { describe, expect, it } from "vitest";
import { rankRepos, scoreRepo } from "./rank";
import type { RankableRepo } from "./types";

const base = (over: Partial<RankableRepo> = {}): RankableRepo => ({
  name: "demo",
  description: "A solid project description for testing quality",
  stargazers_count: 0,
  forks_count: 0,
  size: 500,
  language: "TypeScript",
  topics: ["nextjs"],
  pushed_at: new Date().toISOString(),
  commitCount: 40,
  homepage: null,
  html_url: "https://github.com/lipereis/demo",
  fork: false,
  ...over,
});

describe("scoreRepo", () => {
  it("scores recent TS repo with commits higher than empty stub", () => {
    const strong = scoreRepo(base());
    const stub = scoreRepo(
      base({
        description: null,
        commitCount: 0,
        size: 1,
        language: null,
        topics: [],
        pushed_at: "2020-01-01T00:00:00Z",
      }),
    );
    expect(strong).toBeGreaterThan(stub);
  });

  it("weights stars when present", () => {
    const starred = scoreRepo(base({ stargazers_count: 50, forks_count: 10 }));
    const plain = scoreRepo(base());
    expect(starred).toBeGreaterThan(plain);
  });
});

describe("rankRepos", () => {
  it("returns top N excluding forks and denylist", () => {
    const ranked = rankRepos(
      [
        base({ name: "keep", commitCount: 80 }),
        base({ name: "lipereis", commitCount: 100 }),
        base({ name: "forked", fork: true, commitCount: 99 }),
        base({ name: "old", commitCount: 5, pushed_at: "2022-01-01T00:00:00Z" }),
      ],
      { top: 2, denylist: ["lipereis"] },
    );
    expect(ranked).toHaveLength(2);
    expect(ranked[0].name).toBe("keep");
    expect(ranked.every((r) => r.name !== "forked")).toBe(true);
  });
});
