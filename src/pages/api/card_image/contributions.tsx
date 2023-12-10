import { createImageUsingVercel } from '@/pages/api/image_gen/vercel_generator';
import { CardTypes } from '../types/cards';
import { ContributionsData } from '@/pages/api/image_gen/templates/Contributions';

export const config = {
  runtime: 'edge'
};

// eg: http://localhost:3000/api/card_image/contributions?contributions=100&percentile=1
const generateUsingVercel = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const contributions = searchParams.get('contributions');
  const percentile = searchParams.get('percentile');

  const data = {
    contributions: parseInt(contributions || '0'),
    percentile: parseInt(percentile || '0')
  };

  return (
    await createImageUsingVercel(
      data as ContributionsData,
      CardTypes.YOUR_CONTRIBUTIONS,
      'browser'
    )
  ).image;
};

export default generateUsingVercel;
