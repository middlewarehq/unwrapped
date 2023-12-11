import {
  getLongestContributionStreak,
  getMonthWiseContributionCount,
  getRepoWiseOpensourceContributionsCount
} from '@/analytics/contribution-analytics';
import {
  getCommitPercentile,
  getPRListAndMonthlyCountsFromGqlResponse,
  getTopNRecurringAuthors,
  getTopNRecurringReviewers,
  getTotalCodeAdditions,
  getTotalCodeDeletions,
  getUserReviewCountWithRequestChanges,
  splitPRsByDayNight
} from '@/analytics/pr-analytics';
import {
  fetchAllPullRequests,
  fetchAllReviewedPRs,
  fetchUserGitHubContributionCalendarMetrics,
  fetchUser,
  fetchRepoWiseContributionsForUser,
  fetchUserContributionSummaryMetrics
} from '@/api-helpers/exapi-sdk/github';
import { getGithubRepositoryContributionData } from '@/api-helpers/card-data-adapter';
import { GitHubDataResponse } from '@/types/api-responses';
import { GithubUser } from '@/api-helpers/exapi-sdk/types';

const remove_users_login = (list: Array<string>, user_login: string) => {
  const indexToRemove = list.indexOf(user_login);
  return list.slice(0, indexToRemove).concat(list.slice(indexToRemove + 1));
};

export const fetchGithubUnwrappedData = async (
  token: string,
  timezone: string,
  username?: string
): Promise<GitHubDataResponse> => {
  const user = username
    ? ({ login: username } as GithubUser)
    : await fetchUser(token);

  const [
    pr_authored_data,
    pr_reviewed_data,
    user_daily_contributions,
    repo_wise_contribution_data,
    contribution_summary
  ] = await Promise.all([
    fetchAllPullRequests(user.login, token),
    fetchAllReviewedPRs(user.login, token),
    fetchUserGitHubContributionCalendarMetrics(user.login, token),
    fetchRepoWiseContributionsForUser(user.login, token),
    fetchUserContributionSummaryMetrics(user.login, token)
  ]);

  const [authored_prs, authored_monthly_pr_counts] =
    getPRListAndMonthlyCountsFromGqlResponse(pr_authored_data);
  const [reviewed_prs, reviewed_monthly_pr_counts] =
    getPRListAndMonthlyCountsFromGqlResponse(pr_reviewed_data);

  const total_additions = getTotalCodeAdditions(authored_prs);

  const total_deletions = getTotalCodeDeletions(authored_prs);

  const top_reviewed_contributors = remove_users_login(
    getTopNRecurringAuthors(reviewed_prs),
    user.login
  );

  const top_reviewers = remove_users_login(
    getTopNRecurringReviewers(authored_prs),
    user.login
  );

  const monthly_contributions = getMonthWiseContributionCount(
    user_daily_contributions
  );

  const longest_streak = getLongestContributionStreak(user_daily_contributions);

  const { day, night } = splitPRsByDayNight(authored_prs, timezone);

  const reviewed_prs_with_requested_changes_count =
    getUserReviewCountWithRequestChanges(reviewed_prs, user.login);

  const repo_wise_opensource_contributions =
    getRepoWiseOpensourceContributionsCount(
      repo_wise_contribution_data,
      user.login
    );

  return {
    user,
    authored_monthly_pr_counts,
    reviewed_monthly_pr_counts,
    total_contributions: user_daily_contributions?.totalContributions || 0,
    total_additions,
    total_deletions,
    top_reviewed_contributors,
    top_reviewers,
    monthly_contributions,
    longest_streak,
    reviewed_prs_with_requested_changes_count,
    oss_contributions: repo_wise_opensource_contributions.map((obj) =>
      getGithubRepositoryContributionData(obj)
    ),
    prs_opened_during_day: day.length,
    prs_opened_during_night: night.length,
    contribution_percentile: getCommitPercentile(
      contribution_summary?.totalCommitContributions || 0
    ),
    total_commit_contributions: contribution_summary?.totalCommitContributions,
    total_pr_contributions: contribution_summary?.totalPullRequestContributions,
    total_review_contributions:
      contribution_summary?.totalPullRequestReviewContributions,
    total_issue_contributions: contribution_summary?.totalIssueContributions,
    global_contributions: 4500000000
  };
};
