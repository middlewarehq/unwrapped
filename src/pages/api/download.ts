import { NextApiRequest, NextApiResponse } from 'next';
import { fetchData, generateImages } from '@/pages/api/image_gen';
import { runBenchmark } from '@/pages/api/utils/benchmarking';
import chalk from 'chalk';
import { archiveFiles } from './utils/archive';
import { getCardLinksFromGithubData } from '@/pages/api/utils/general';

const fetchAndDownloadImageBuffer = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const data = await fetchData();
    const imageBuffer = await runBenchmark(generateImages, data);
    console.log(getCardLinksFromGithubData(data));

    const zippedData = await archiveFiles(
      imageBuffer.map(({ data, fileName }) => ({ data, fileName }))
    );

    const fileName = 'middleware_unwrapped.zip';

    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${encodeURIComponent(fileName)}`
    );
    res.setHeader('Cache-Control', 'no-cache');
    res.send(zippedData);
    console.log(chalk.green('Successfully sent buffer to client'));
  } catch (error) {
    // console.error('Error fetching or sending buffer:', error);
    console.log(chalk.red('Error fetching or sending buffer:'), error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default fetchAndDownloadImageBuffer;
