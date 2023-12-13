import { createImageUsingVercel } from '@/api-helpers/vercel-generator';
import { CardTypes } from '../../../../types/cards';

export const config = {
  runtime: 'edge'
};

const data = {
  prsDuringDay: 1000,
  totalPrs: 4000,
  productiveHour: 19,
  productiveDay: 'tuesday',
  username: 'eshaan-yadav'
};

const generateUsingVercel = async () => {
  return (
    await createImageUsingVercel(data, CardTypes.DAY_NIGHT_CYCLE, 'browser')
  ).image;
};

export default generateUsingVercel;
