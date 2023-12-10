import { createImageUsingVercel } from '@/pages/api/image_gen/vercel_generator';
import { CardTypes } from '../types/cards';
import { StreakData } from '../image_gen/templates/Streak';

export const config = {
  runtime: 'edge'
};

const data: StreakData = {
  streak: 50
};

const generateUsingVercel = async () => {
  return (
    await createImageUsingVercel(data, CardTypes.CONTRIBUTION_STREAK, 'browser')
  ).image;
};

export default generateUsingVercel;
