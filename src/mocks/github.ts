import { GitHubDataResponse } from '@/types/api-responses';

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
  avatar?: string;
};

export const updatedGhData = {
  user: {
    login: 'samad-yar-khan',
    id: 70485812,
    node_id: 'MDQ6VXNlcjcwNDg1ODEy',
    avatar_url: 'https://avatars.githubusercontent.com/u/70485812?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/samad-yar-khan',
    html_url: 'https://github.com/samad-yar-khan',
    followers_url: 'https://api.github.com/users/samad-yar-khan/followers',
    following_url:
      'https://api.github.com/users/samad-yar-khan/following{/other_user}',
    gists_url: 'https://api.github.com/users/samad-yar-khan/gists{/gist_id}',
    starred_url:
      'https://api.github.com/users/samad-yar-khan/starred{/owner}{/repo}',
    subscriptions_url:
      'https://api.github.com/users/samad-yar-khan/subscriptions',
    organizations_url: 'https://api.github.com/users/samad-yar-khan/orgs',
    repos_url: 'https://api.github.com/users/samad-yar-khan/repos',
    events_url: 'https://api.github.com/users/samad-yar-khan/events{/privacy}',
    received_events_url:
      'https://api.github.com/users/samad-yar-khan/received_events',
    type: 'User',
    site_admin: false,
    name: 'Samad Yar Khan',
    company: '@monoclehq ',
    blog: 'https://www.linkedin.com/in/samad-yar-khan/',
    location: 'Delhi, India ',
    email: null,
    hireable: null,
    bio: "GSoC 22,23 || SDE @middlewarehq  || SDE Intern'22 @Samsung || OpenSource @RocketChat || NSUT'23 || Passionate Developer",
    twitter_username: null,
    public_repos: 64,
    public_gists: 0,
    followers: 53,
    following: 38,
    created_at: '2020-08-30T18:29:15Z',
    updated_at: '2023-12-01T08:10:35Z',
    private_gists: 0,
    total_private_repos: 6,
    owned_private_repos: 5,
    disk_usage: 75739,
    collaborators: 1,
    two_factor_authentication: true,
    plan: {
      name: 'pro',
      space: 976562499,
      collaborators: 0,
      private_repos: 9999
    }
  },
  authored_monthly_pr_counts: [55, 33, 49, 33, 34, 18, 57, 44, 43, 77, 41, 23],
  reviewed_monthly_pr_counts: [11, 8, 14, 6, 12, 35, 37, 50, 43, 72, 51, 13],
  total_contributions: 2862,
  total_additions: 119309,
  total_deletions: 7316,
  top_reviewed_contributors: [
    'amoghjalan',
    'adnanhashmi09',
    'Nabhag8848',
    'shivam-bit',
    'VipinDevelops',
    'dhruvagarwal',
    'henit-chobisa',
    'jayantbh',
    'ayush3160',
    'chinma-yyy',
    'Prince-Mendiratta',
    'kanishbodhwani',
    'e-for-eshaan',
    'sampaiodiego'
  ],
  top_reviewers: [
    'jayantbh',
    'amoghjalan',
    'dhruvagarwal',
    'shivam-bit',
    'e-for-eshaan',
    'sidmohanty11',
    'Sing-Li',
    'adnanhashmi09',
    'axonasif',
    'Palanikannan1437',
    'Dnouv',
    'dkurt'
  ],
  monthly_contributions: {
    '0': 203,
    '1': 196,
    '2': 265,
    '3': 228,
    '4': 189,
    '5': 135,
    '6': 357,
    '7': 277,
    '8': 256,
    '9': 370,
    '10': 215,
    '11': 171
  },
  longest_streak: 19,
  oss_contributions: [
    {
      org_name: 'RocketChat',
      repo_name: 'Apps.Github22',
      org_avatar_url: 'https://avatars.githubusercontent.com/u/12508788?v=4',
      contributions_count: 57
    },
    {
      org_name: 'RocketChat',
      repo_name: 'Apps.Notion',
      org_avatar_url: 'https://avatars.githubusercontent.com/u/12508788?v=4',
      contributions_count: 27
    }
  ],
  prs_opened_during_day: 200,
  prs_opened_during_night: 350,
  contribution_percentile: 98,
  global_contributions: 432094792,
  reviewed_prs_with_requested_changes_count: 32
} as GitHubDataResponse;
