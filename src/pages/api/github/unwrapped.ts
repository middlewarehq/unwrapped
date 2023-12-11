import { dec } from '@/api-helpers/auth-supplementary';

import { NextApiRequest, NextApiResponse } from 'next';
import { fetchGithubUnwrappedData } from '@/api-helpers/unrwrapped-aggregator';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let token = req.cookies.ghct;
  const timezone = (req.headers['x-timezone'] as string) || 'UTC';

  if (!token) {
    return res.status(403).json({
      message: 'GitHub Access token not found.'
    });
  }

  token = dec(token);

  try {
    const unwrappedData = await fetchGithubUnwrappedData(token, timezone);

    res.status(200).json(unwrappedData);
  } catch (e: any) {
    console.error(e);
    res.status(400).send({ message: e.message });
  }
}
