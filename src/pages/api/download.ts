import { NextApiRequest, NextApiResponse } from 'next';
import { generateImages } from '@/pages/api/image_gen';
import { runBenchmark } from '@/pages/api/utils/benchmarking';

const fetchAndDownloadImageBuffer = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const imageBuffer = await runBenchmark(generateImages);
    const fileName = 'middleware_unwrapped.zip';

    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${encodeURIComponent(fileName)}`
    );
    res.setHeader('Cache-Control', 'no-cache');
    res.send(imageBuffer);
    console.log('\x1b[32m%s\x1b[0m', '\nSuccess!\n');
  } catch (error) {
    console.error('Error fetching or sending buffer:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default fetchAndDownloadImageBuffer;
