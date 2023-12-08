import { createImageUsingVercel } from '@/pages/api/image_gen/vercel_generator';
import { CardTypes } from '../../types/cards';

export const config = {
  runtime: 'edge'
};

const data = {
  prsDuringDay: 3000,
  totalPrs: 4000
};

const generateUsingVercel = async () => {
  return (
    await createImageUsingVercel(data, CardTypes.DAY_NIGHT_CYCLE, 'browser')
  ).image;
};

export default generateUsingVercel;
