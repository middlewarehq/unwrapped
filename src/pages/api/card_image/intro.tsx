import { createImageUsingVercel } from '@/pages/api/image_gen/vercel_generator';
import { CardTypes } from '../types/cards';
import { IntroCardProps } from '../image_gen/templates/IntroCard';

export const config = {
  runtime: 'edge'
};

// eg: http://localhost:3000/api/card_image/intro?username=shahzaibkhalid&year=2021
const generateUsingVercel = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');
  const year = searchParams.get('year');

  const data = {
    username: username || '',
    year: parseInt(year || '0')
  };

  return (
    await createImageUsingVercel(
      data as IntroCardProps,
      CardTypes.UNWRAPPED_INTRO,
      'browser'
    )
  ).image;
};

export default generateUsingVercel;
