import { createImageUsingVercel } from '@/api-helpers/vercel-generator';
import { CardTypes } from '../../../../types/cards';

export const config = {
  runtime: 'edge'
};

const data = {
  prsDuringDay: 2000,
  totalPrs: 4000
};

const generateUsingVercel = async () => {
  return (
    await createImageUsingVercel(data, CardTypes.DAY_NIGHT_CYCLE, 'browser')
  ).image;
};

export default generateUsingVercel;
