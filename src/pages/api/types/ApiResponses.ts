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
