import chalk from 'chalk';
import { NextApiRequest, NextApiResponse } from 'next';
import { archiveFiles } from '@/api-helpers/archive';

import { fetchSavedCards } from '@/api-helpers/persistance';

const fetchAndDownloadAllCardsZip = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  let username = req.query.username as string;

  if (!username) {
    return res.status(400).json({
      message: 'Invalid parameters, must pass valid username.'
    });
  }

  try {
    const cachedCardsBuffer = await fetchSavedCards(username);

    let imageBuffer = cachedCardsBuffer;

    if (!imageBuffer?.length) {
      return res.status(404).json({
        message: `Cards not found for user ${username}.`
      });
    }

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

    console.log(chalk.green('Successfully sent buffer to client'));
  } catch (error: any) {
    console.log(chalk.red('Error fetching or sending buffer:'), error);
    res.status(error.status || 500).json({ message: error.message });
  }
};

export default fetchAndDownloadAllCardsZip;
