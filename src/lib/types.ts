export type RankableRepo = {
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  size: number;
  language: string | null;
  topics: string[];
  pushed_at: string;
  commitCount: number;
  homepage: string | null;
  html_url: string;
  fork: boolean;
};

export type ScoredRepo = RankableRepo & { score: number };
