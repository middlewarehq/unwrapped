export interface Review {
  author: {
    login: string;
  };
  createdAt: string;
  state: string;
}

export interface PullRequest {
  repository: {
    name: string;
    owner: {
      login: string;
    };
  };
  createdAt: string;
  mergedAt: string;
  additions: number;
  deletions: number;
  reviews: {
    edges: ReviewEdge[];
  };
}

export interface ReviewEdge {
  node: Review;
}

export interface PageInfo {
  hasNextPage: boolean;
  endCursor: string;
}

export interface PullRequestEdge {
  cursor: string;
  node: PullRequest;
}

export interface SearchResponse {
  edges: PullRequestEdge[];
  pageInfo: PageInfo;
}

export interface GraphQLResponse {
  data: {
    search: SearchResponse;
  };
}

export interface GithubUser {
  login: string;
  id: number;
  name: string;
  email: string;
}

export interface ContributionDay {
  contributionCount: number;
  date: string;
}

export interface GithubWeeklyContributionData {
  contributionDays: ContributionDay[];
}

export interface GithubContributionCalendar {
  totalContributions: number;
  weeks: GithubWeeklyContributionData[];
}

export interface GithubContributionsCollection {
  contributionCalendar: GithubContributionCalendar;
}

export interface GitHubMetricsResponse {
  user: {
    contributionsCollection: GithubContributionsCollection;
  };
}

export interface GraphQLMetricsResponse {
  data: GitHubMetricsResponse;
}
