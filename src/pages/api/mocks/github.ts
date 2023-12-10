export const ghData = {
  data: {
    // UNWRAPPED_INTRO
    name: 'John Doe',
    username: '@johndoe',
    year: 2023,
    avatar: 'https://i.imgur.com/1wZS3qP.jpg',
    // YOUR_CONTRIBUTIONS
    total_contributions: 2341,
    contribution_percentile: 98,
    global_contributions: 432094792,
    // CONTRIBUTION_STREAK
    contribution_streak: 23,
    // NINJA_OR_ZEN
    commit_history: {
      january: 23,
      february: 34,
      march: 45,
      april: 56,
      may: 67,
      june: 78,
      july: 89,
      august: 90,
      september: 98,
      october: 87,
      november: 76
    },
    // DAY_NIGHT_CYCLE
    commits_during_day: 253,
    total_commits: 800,
    // IT_TAKES_A_VILLAGE
    frequent_reviewers_and_reviewees: ['@agatha', '@christie', '@james'],
    // GUARDIAN_OF_PROD
    prs_with_revert: 2,
    reviewed_prs_not_reverted: 2343,
    // TOP_REVIEWERS
    frequent_reviewers: ['@johnson', '@james', '@jane'],
    // PR_TIME_LAGS
    reviewer_lag: 432,
    reviewee_lag: 323,
    // PR_REVIEWED_VS_AUTHORED, PR_REVIEWED_VS_AUTHORED
    authored_prs: 321,
    reviewed_prs: 234,
    // PRODUCTION_BREAKING
    prod_breaks: 323,
    // OSS_CONTRIBUTION
    oss_contributions: 21
  }
};

export type GithubReview = {
  name: string;
  userName: string;
  avatar: string;
  recievedFromUser?: boolean;
  gaveToUser?: boolean;
};
