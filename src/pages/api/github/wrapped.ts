import {
  getLongestContributionStreak,
  getMonthWiseContributionCount
} from '@/analytics/contribution_analytics';
import {
  getPRListAndMonthlyCountsFromGqlResponse,
  getTopNRecurringAuthors,
  getTopNRecurringReviewers,
  getTotalCodeAdditions,
  getTotalCodeDeletions,
  splitPRsByDayNight
} from '@/analytics/pr_analytics';
import { dec } from '@/api-helpers/auth-supplementary';
import {
  fetchAllPullRequests,
  fetchAllReviewedPRs,
  fetchUserGitHubContributionCalendarMetrics,
  fetchUser
} from '@/exapi_sdk/github';
import { NextApiRequest, NextApiResponse } from 'next';

const remove_users_login = (list: Array<string>, user_login: string) => {
  const indexToRemove = list.indexOf(user_login);
  return list.slice(0, indexToRemove).concat(list.slice(indexToRemove + 1));
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let token = dec(req.cookies.ghct || '');
  const timezone = (req.headers.timezone as string) || 'IST';

  if (!token) {
    return res.status(403).json({
      message: 'GitHub Access token not found.'
    });
  }

  token = dec(token);

  try {
    const user = await fetchUser(token);

    const [pr_authored_data, pr_reviewed_data, user_daily_contributions] =
      await Promise.all([
        fetchAllPullRequests(user.login, token),
        fetchAllReviewedPRs(user.login, token),
        fetchUserGitHubContributionCalendarMetrics(user.login, token)
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

    const longest_streak = getLongestContributionStreak(
      user_daily_contributions
    );

    const { day, night } = splitPRsByDayNight(authored_prs, timezone);

    res.status(200).json({
      user,
      authored_monthly_pr_counts,
      reviewed_monthly_pr_counts,
      total_contributions: user_daily_contributions?.totalContributions,
      total_additions,
      total_deletions,
      top_reviewed_contributors,
      top_reviewers,
      monthly_contributions,
      longest_streak,
      total_oss_contributions: 100,
      prs_opened_during_day: day.length,
      prs_opened_during_night: night.length,
      contribution_percentile: 98,
      global_contributions: 432094792
    });
  } catch (e: any) {
    console.error(e);
    res.status(400).send({ message: e.message });
  }
}
