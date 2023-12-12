import { GithubUser } from '@/api-helpers/exapi-sdk/types';

export type GithubData = {
  data: {
    name: string;
    username: string;
    year: number;
    avatar: string;
    total_contributions: number;
    contribution_percentile: number;
    global_contributions: number;
    contribution_streak: number;
    commit_history: {
      january: number;
      february: number;
      march: number;
      april: number;
      may: number;
      june: number;
      july: number;
      august: number;
      september: number;
      october: number;
      november: number;
    };
    commits_during_day: number;
    total_commits: number;
    frequent_reviewers_and_reviewees: string[];
    prs_with_revert: number;
    reviewed_prs_not_reverted: number;
    frequent_reviewers: string[];
    reviewer_lag: number;
    reviewee_lag: number;
    authored_prs: number;
    reviewed_prs: number;
    prod_breaks: number;
    oss_contributions: number;
    reviewed_prs_with_requested_changes_count: number;
  };
};

export type Plan = {
  name: string;
  space: number;
  collaborators: number;
  private_repos: number;
};

export type GitHubDataResponse = {
  user: GithubUser;
  authored_monthly_pr_counts: number[];
  reviewed_monthly_pr_counts: number[];
  total_contributions: number;
  total_additions: number;
  total_deletions: number;
  top_reviewed_contributors: string[];
  top_reviewers: string[];
  monthly_contributions: Record<string, number>;
  longest_streak: number;
  oss_contributions: GithubRepositoryContributionData[];
  prs_opened_during_day: number;
  prs_opened_during_night: number;
  contribution_percentile: number;
  global_contributions: number;
  reviewed_prs_with_requested_changes_count: number;
  total_commit_contributions?: number;
  total_pr_contributions?: number;
  total_review_contributions?: number;
  total_issue_contributions?: number;
};

export type GithubRepositoryContributionData = {
  org_name: string;
  repo_name: string;
  org_avatar_url?: string;
  contributions_count: number;
};

export type UserImprovementMetrics = {
  first_response_time_sum: number;
  rework_time_sum: number;
  rework_cycles_sum: number;
};
