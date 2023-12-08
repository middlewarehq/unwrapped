import { fetchAllPullRequests, fetchUser } from '@/pages/api/exapi/github';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.cookies.ghct || '';
  const user = await fetchUser(token);

  const pull_request_data = await fetchAllPullRequests(user.login, token);
  res.status(200).json({
    pull_request_data
  });
}
