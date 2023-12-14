import { dec } from '@/api-helpers/auth-supplementary';

import { NextApiRequest, NextApiResponse } from 'next';
import { fetchGithubUnwrappedData } from '@/api-helpers/unrwrapped-aggregator';
import { fetchUser, fetchUserByLogin } from '@/api-helpers/exapi-sdk/github';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let token = req.cookies.ghct;
  const timezone = (req.headers['x-timezone'] as string) || 'UTC';

  if (!token && !req.query.username) {
    return res.status(403).json({
      message: 'GitHub Access token not found.'
    });
  }

  if (!token) {
    token = process.env.GLOBAL_GH_PAT;
  } else {
    token = dec(token);
  }

  try {
    const user = req.query.username
      ? await fetchUserByLogin(token, req.query.username as string)
      : await fetchUser(token);
    const unwrappedData = await fetchGithubUnwrappedData(token, timezone, user);

    res.status(200).json(unwrappedData);
  } catch (e: any) {
    console.error(e);
    res.status(400).send({ message: e.message });
  }
}
