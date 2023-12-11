import { dec } from '@/api-helpers/auth-supplementary';

import { NextApiRequest, NextApiResponse } from 'next';
import { fetchUser } from '@/api-helpers/exapi-sdk/github';

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
    const user = await fetchUser(token);

    res.status(200).json({ user });
  } catch (e: any) {
    console.error(e);
    res.status(400).send({ message: e.message });
  }
}
