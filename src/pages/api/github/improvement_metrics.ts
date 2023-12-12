import { dec } from '@/api-helpers/auth-supplementary';
import { fetchImprovementMetricsData } from '@/api-helpers/unrwrapped-aggregator';

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let token = req.cookies.ghct;

  if (!token) {
    return res.status(403).json({
      message: 'GitHub Access token not found.'
    });
  }

  token = dec(token);

  try {
    const improvementMetricsData = await fetchImprovementMetricsData(token);

    res.status(200).json(improvementMetricsData);
  } catch (e: any) {
    console.error(e);
    res.status(400).send({ message: e.message });
  }
}
