import { NextApiRequest, NextApiResponse } from 'next';
import { generateImages } from '@/pages/api/image_gen';

const fetchAndDownloadImageBuffer = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const imageBuffer = await generateImages(); // Assuming this returns the buffer
    const fileName = 'middleware_unwrapped.zip'; // Specify a filename with the appropriate extension

    // Set headers to indicate a downloadable file
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${encodeURIComponent(fileName)}`
    );
    res.setHeader('Cache-Control', 'no-cache');

    // Send the buffer as the response
    res.send(imageBuffer);
  } catch (error) {
    console.error('Error fetching or sending buffer:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default fetchAndDownloadImageBuffer;
