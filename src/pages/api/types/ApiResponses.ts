import { GithubUser } from '@/exapi_sdk/types';

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
  };
};

export type WrappedResponse = {
  user: GithubUser; // Replace with the actual type of the 'user' property
  authored_monthly_counts: number[]; // Replace with the actual type of the 'authored_monthly_counts' property
  reviewed_monthly_counts: number[]; // Replace with the actual type of the 'reviewed_monthly_counts' property
  total_contributions?: number | null; // Replace with the actual type of the 'total_contributions' property
  total_additions: number;
  total_deletions: number;
  top_reviewed_contributors: string[]; // Replace with the actual type of the 'top_reviewed_contributors' property
  top_reviewers: string[]; // Replace with the actual type of the 'top_reviewers' property
  monthly_contributions: number; // Replace with the actual type of the 'monthly_contributions' property
  longest_streak: number; // Replace with the actual type of the 'longest_streak' property
  total_oss_contributions: number;
  prs_opened_during_day: number;
  prs_opened_during_night: number;
  contribution_percentile: number;
  global_contributions: number;
};
