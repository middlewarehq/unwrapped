// api to check if hash is valid, accepts username and hash, return true or false

import {
  bcryptGen,
  extractFilenameWithoutExtension
} from '@/utils/stringHelpers';
import { NextApiRequest, NextApiResponse } from 'next';
import { fetchSavedCards } from '@/api-helpers/persistance';
import { logException } from '@/utils/logger';

const checkHash = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, hash } = req.query;
  if (!username || !hash) {
    return res.status(400).json({
      message: 'Username or hash not found.'
    });
  }

  const userNameHash = bcryptGen(username as string);
  const isValid = userNameHash === (hash as string);

  if (isValid) {
    try {
      const imageData = await fetchSavedCards(username as string);
      const imageDataWithURL = imageData.map((image) => {
        const filename = extractFilenameWithoutExtension(image.fileName);
        const hash = bcryptGen((username as string) + filename);
        return {
          ...image,
          url: `/shared/${username}/${filename}/${hash}`
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
