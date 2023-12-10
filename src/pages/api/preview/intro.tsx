import { createImageUsingVercel } from '@/api-helpers/vercel-generator';
import { CardTypes } from '../../../types/cards';
import { IntroCardProps } from '../../../components/templates/IntroCard';

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
