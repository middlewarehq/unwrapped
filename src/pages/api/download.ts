import chalk from 'chalk';
import { NextApiRequest, NextApiResponse } from 'next';
import { generateImages } from '@/pages/api/image-gen';
import { archiveFiles } from '../../api-helpers/archive';
// import { getCardLinksFromGithubData } from '@/api-helpers/general';
import { fetchGithubUnwrappedData } from '@/api-helpers/unrwrapped-aggregator';
import { dec } from '@/api-helpers/auth-supplementary';

const fetchAndDownloadImageBuffer = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  let token = req.cookies.ghct;
  const timezone = (req.headers.timezone as string) || 'UTC';

  if (!token) {
    return res.status(403).json({
      message: 'GitHub Access token not found.'
    });
  }

  token = dec(token);

  try {
    const data = await fetchGithubUnwrappedData(
      token,
      timezone,
      req.query.username as string
    );
    const imageBuffer = await generateImages(data);

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
      res.setHeader('Content-Type', 'application/json');
      res.send(
        imageBuffer.map(
          ({ data }) => `data:image/png;base64,${data.toString('base64')}`
        )
      );
    }
    console.log(chalk.green('Successfully sent buffer to client'));
  } catch (error) {
    // console.error('Error fetching or sending buffer:', error);
    console.log(chalk.red('Error fetching or sending buffer:'), error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default fetchAndDownloadImageBuffer;
