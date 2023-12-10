import { createImageUsingVercel } from '@/api-helpers/vercel-generator';
import { CardTypes } from '../../../types/cards';
import { GuardianData } from '../../../components/templates/Guardian';

export const config = {
  runtime: 'edge'
};

const data: GuardianData = {
  numberOfTimes: 50
};

const generateUsingVercel = async () => {
  return (
    await createImageUsingVercel(data, CardTypes.GUARDIAN_OF_PROD, 'browser')
  ).image;
};

export default generateUsingVercel;
