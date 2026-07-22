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

export type GithubData = {
  profile: {
    login: string;
    avatarUrl: string;
    followers: number;
    following: number;
    publicRepos: number;
    htmlUrl: string;
  };
  topProjects: ScoredRepo[];
  allProjects: ScoredRepo[];
  stats: { totalStars: number; totalForks: number };
  languages: Record<string, number>;
  commitActivity: { week: string; count: number }[];
  contributionWeeks: { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }[];
  fetchedAt: string;
};
