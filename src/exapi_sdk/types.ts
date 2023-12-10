export interface Review {
  author: {
    login: string;
  };
  createdAt: string;
  state: string;
}

export interface PullRequest {
  author: {
    login: string;
  };
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
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string | null;
  blog: string;
  location: string;
  email: string | null;
  hireable: boolean | null;
  bio: string;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
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

export interface GraphQLContributionCalendarMetricsResponse {
  data: GitHubMetricsResponse;
}

export interface GithubContributionSummaryCollection {
  totalCommitContributions: number;
  totalIssueContributions: number;
  totalPullRequestContributions: number;
  totalPullRequestReviewContributions: number;
  totalRepositoriesWithContributedPullRequests: number;
  totalRepositoriesWithContributedIssues: number;
  totalRepositoriesWithContributedPullRequestReviews: number;
  totalRepositoriesWithContributedCommits: number;
}

export interface GraphQLContributionSummaryResponse {
  data: {
    user: {
      contributionsCollection: GithubContributionSummaryCollection;
    };
  };
}

export interface GraphQLRepositoryContributionData {
  data: {
    user: {
      contributionsCollection: {
        issueContributionsByRepository: RepositoryContributionData[];
        commitContributionsByRepository: RepositoryContributionData[];
        pullRequestContributionsByRepository: RepositoryContributionData[];
        pullRequestReviewContributionsByRepository: RepositoryContributionData[];
      };
    };
  };
}

export interface RepositoryContributionData {
  repository: {
    name: string;
    owner: {
      login: string;
    };
    isPrivate: boolean;
    isFork: boolean;
  };
  contributions: {
    totalCount: number;
  };
}
