import { createImageUsingVercel } from '@/api-helpers/vercel-generator';
import { CardTypes } from '../../../types/cards';
import { IntroCardProps } from '../../../components/templates/IntroCard';
import { Username } from '@/components/templates';

export const config = {
  runtime: 'edge'
};

const data: IntroCardProps & Username = {
  username: 'jayantbh',
  year: 2023
};

const generateUsingVercel = async () => {
  return (
    await createImageUsingVercel(data, CardTypes.UNWRAPPED_INTRO, 'browser')
  ).image;
};

export default generateUsingVercel;
