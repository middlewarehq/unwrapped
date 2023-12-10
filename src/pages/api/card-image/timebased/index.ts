import { createImageUsingVercel } from '@/api-helpers/vercel-generator';
import { CardTypes } from '../../../../types/cards';

export const config = {
  runtime: 'edge'
};

// eg: http://localhost:3000/api/card_image/timebased?prsDuringDay=23&totalPrs=90
const allDayImage = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const prsDuringDay = searchParams.get('prsDuringDay');
  const totalPrs = searchParams.get('totalPrs');

  const data = {
    prsDuringDay: prsDuringDay ? parseInt(prsDuringDay) : 0,
    totalPrs: totalPrs ? parseInt(totalPrs) : 0
  };
  return (
    await createImageUsingVercel(data, CardTypes.DAY_NIGHT_CYCLE, 'browser')
  ).image;
};

export default allDayImage;
