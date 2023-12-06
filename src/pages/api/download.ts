import { NextApiRequest, NextApiResponse } from 'next';
import { generateImages } from '@/pages/api/image_gen/index';

const fetchAndGenerateImages = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const response = await generateImages();
  return res.status(200).json(response);
};

export default fetchAndGenerateImages;
