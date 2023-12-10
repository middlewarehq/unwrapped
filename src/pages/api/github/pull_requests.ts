import { getPRListAndMonthlyCountsFromGqlResponse } from '@/analytics/pr_analytics';
import { dec } from '@/api-helpers/auth-supplementary';
import {
  fetchAllPullRequests,
  fetchAllReviewedPRs,
  fetchUserGitHubContributionCalendarMetrics,
  fetchUser
} from '@/exapi_sdk/github';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = dec(req.cookies.ghct || '');

  if (!token) {
    return res.status(403).json({
      message: 'GitHub Access token not found.'
    });
  }

  try {
    const user = await fetchUser(token);

    const [pr_authored_data, pr_reviewed_data, user_metrics] =
      await Promise.all([
        fetchAllPullRequests(user.login, token),
        fetchAllReviewedPRs(user.login, token),
        fetchUserGitHubContributionCalendarMetrics(user.login, token)
      ]);

    const [authored_prs, authored_monthly_counts] =
      getPRListAndMonthlyCountsFromGqlResponse(pr_authored_data);
    const [reviewed_prs, reviewed_monthly_counts] =
      getPRListAndMonthlyCountsFromGqlResponse(pr_reviewed_data);

    res.status(200).json({
      authored_prs,
      authored_monthly_counts,
      reviewed_prs,
      reviewed_monthly_counts,
      user_metrics
    });
  } catch (e: any) {
    console.error(e);
    res.status(400).send({ message: e.message });
  }
}
