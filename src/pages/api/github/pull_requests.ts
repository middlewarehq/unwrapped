import { fetchAllPullRequests, fetchUser } from '@/exapi_sdk/github';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.cookies.ghct;

  if (!token) {
    return res.status(403).json({
      message: 'GitHub Access token not found.'
    });
  }

  const user = await fetchUser(token);

  const pull_request_data = await fetchAllPullRequests(user.login, token);
  res.status(200).json({
    pull_request_data
  });
}
