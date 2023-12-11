import { createImageUsingVercel } from '@/api-helpers/vercel-generator';
import { CardTypes } from '../../../types/cards';
import { StreakData } from '../../../components/templates/Streak';
import { Username } from '@/components/templates';

export const config = {
  runtime: 'edge'
};

const data: StreakData & Username = {
  streak: 50,
  username: 'jayantbh'
};

const generateUsingVercel = async () => {
  return (
    await createImageUsingVercel(data, CardTypes.CONTRIBUTION_STREAK, 'browser')
  ).image;
};

export default generateUsingVercel;
