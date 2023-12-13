import chalk from 'chalk';
import { NextApiRequest, NextApiResponse } from 'next';
import { generateImages } from '@/api-helpers/image-gen';
import { archiveFiles } from '@/api-helpers/archive';
// import { getCardLinksFromGithubData } from '@/api-helpers/general';
import { fetchGithubUnwrappedData } from '@/api-helpers/unrwrapped-aggregator';
import { dec } from '@/api-helpers/auth-supplementary';
import { fetchSavedCards, saveCards } from '@/api-helpers/persistance';
import { fetchUser } from '@/api-helpers/exapi-sdk/github';
import { GithubUser } from '@/api-helpers/exapi-sdk/types';
import {
  bcryptGen,
  extractFilenameWithoutExtension
} from '@/utils/stringHelpers';
import { logException } from '@/utils/logger';
import { ImageAPIResponse } from '@/types/images';

const fetchAndDownloadImageBuffer = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  let token = req.cookies.ghct;
  const timezone = (req.headers['x-timezone'] as string) || 'UTC';

  if (!token) {
    return res.status(403).json({
      message: 'GitHub Access token not found.'
    });
  }

  token = dec(token);

  try {
    const user = req.query.username
      ? ({ login: req.query.username } as GithubUser)
      : await fetchUser(token);

    const cachedCardsBuffer = req.query.recache
      ? []
      : await fetchSavedCards(user.login);

    let imageBuffer = cachedCardsBuffer;

    if (!imageBuffer?.length) {
      const data = await fetchGithubUnwrappedData(
        token,
        timezone,
        req.query.username as string
      );
      imageBuffer = await generateImages(data);
      saveCards(user.login, imageBuffer);
    }

    if (req.query.format === 'archive') {
      const zippedData = await archiveFiles(
        imageBuffer.map(({ data, fileName }) => ({ data, fileName }))
      );
      const fileName = 'middleware_unwrapped.zip';
      res.setHeader(
        'Content-Disposition',
        `attachment; filename=${encodeURIComponent(fileName)}`
      );
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Content-Type', 'application/zip');
      res.send(zippedData);
    } else {
      const username = user.login;
      const userNameHash = bcryptGen(username);
      const shareUrl = `/view/${user.login}/${userNameHash}`;

      const imageData = imageBuffer.map(({ data, fileName }) => {
        const file = extractFilenameWithoutExtension(fileName);
        const hash = bcryptGen(username + file);

        return {
          fileName,
          url: `/shared/${username}/${file}/${hash}`,
          data: `data:image/png;base64,${data.toString('base64')}`
        };
      });
      res.setHeader('Content-Type', 'application/json');
      res.send({
        shareAllUrl: shareUrl,
        data: imageData
      } as ImageAPIResponse);
    }
    console.info(chalk.green('Successfully sent buffer to client'));
  } catch (error: any) {
    logException('Error fetching or sending buffer', {
      originalException: error
    });
    console.info(chalk.red('Error fetching or sending buffer:'), error);
    res.status(error.status || 500).json({ message: error.message });
  }
};

export default fetchAndDownloadImageBuffer;
