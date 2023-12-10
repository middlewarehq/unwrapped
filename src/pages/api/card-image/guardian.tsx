import { createImageUsingVercel } from '@/api-helpers/vercel-generator';
import { CardTypes } from '../../../types/cards';
import { GuardianData } from '../../../components/templates/Guardian';

export const config = {
  runtime: 'edge'
};

// eg: http://localhost:3000/api/card_image/guardian?numberOfTimes=120
const generateUsingVercel = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const numberOfTimes = searchParams.get('numberOfTimes');

  const data = {
    numberOfTimes: parseInt(numberOfTimes || '0')
  };

  return (
    await createImageUsingVercel(
      data as GuardianData,
      CardTypes.GUARDIAN_OF_PROD,
      'browser'
    )
  ).image;
};

export default generateUsingVercel;
