// api to check if hash is valid, accepts username and hash, return true or false

import {
  bcryptGen,
  extractFilenameWithoutExtension
} from '@/utils/stringHelpers';
import { NextApiRequest, NextApiResponse } from 'next';
import { fetchSavedCards } from '@/api-helpers/persistance';
import { logException } from '@/utils/logger';
import { fetchUserByLogin } from '@/api-helpers/exapi-sdk/github';

const checkHash = async (req: NextApiRequest, res: NextApiResponse) => {
  let { username, hash } = req.query;
  if (!username) {
    return res.status(400).json({
      message: 'Username or hash not found.'
    });
  }
  const isPublic = req.query.ispublic === 'true';
  let isValid = isPublic;

  if (!isValid) {
    const userNameHash = bcryptGen(username as string);
    isValid = userNameHash === (hash as string);
  }

  if (isValid) {
    try {
      const user = await fetchUserByLogin(
        process.env.GLOBAL_GH_PAT,
        username as string
      );
      username = user.login;
      const imageData = await fetchSavedCards(username as string, isPublic);
      const imageDataWithURL = imageData.map((image) => {
        const filename = extractFilenameWithoutExtension(image.fileName);
        const hash = bcryptGen((username as string) + filename);
        return {
          ...image,
          url: `/shared/${username}/${filename}/${hash}`,
          data: `data:image/png;base64,${image.data.toString('base64')}`
        };
      });

      res.status(200).json({ isValid, data: imageDataWithURL });
    } catch (e) {
      logException('Error fetching from share-all data from s3', {
        originalException: e
      });
      res.status(400).json({ isValid, data: null });
    }
  } else res.status(400).json({ isValid, data: null });
};

export default checkHash;
