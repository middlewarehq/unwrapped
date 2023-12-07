import { createImageUsingVercel } from '@/pages/api/image_gen/vercel_generator';
import { CardTypes } from '../types/cards';
import { IntroCardProps } from '../image_gen/templates/IntroCard';

export const config = {
  runtime: 'edge'
};

const data: IntroCardProps = {
  username: '@john_dev',
  year: 2023
};

const generateUsingVercel = async () => {
  return (
    await createImageUsingVercel(data, CardTypes.UNWRAPPED_INTRO, 'browser')
  ).image;
};

export default generateUsingVercel;
