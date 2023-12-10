import { createImageUsingVercel } from '@/pages/api/image_gen/vercel_generator';
import { CardTypes } from '../types/cards';
import { ContributionsData } from '@/pages/api/image_gen/templates/Contributions';

export const config = {
  runtime: 'edge'
};

const data: ContributionsData = {
  contributions: 20312,
  percentile: 2
};

const generateUsingVercel = async () => {
  return (
    await createImageUsingVercel(data, CardTypes.YOUR_CONTRIBUTIONS, 'browser')
  ).image;
};

export default generateUsingVercel;
