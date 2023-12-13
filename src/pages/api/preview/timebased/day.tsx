import { createImageUsingVercel } from '@/api-helpers/vercel-generator';
import { CardTypes } from '../../../../types/cards';

export const config = {
  runtime: 'edge'
};

const data = {
  prsDuringDay: 3000,
  totalPrs: 4000,
  username: 'jayantbh',
  productiveDay: 'tuesday',
  productiveHour: 8
};

const generateUsingVercel = async () => {
  return (
    await createImageUsingVercel(data, CardTypes.DAY_NIGHT_CYCLE, 'browser')
  ).image;
};

export default generateUsingVercel;
