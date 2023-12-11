import { createImageUsingVercel } from '@/api-helpers/vercel-generator';
import { CardTypes } from '../../../types/cards';
import { GuardianData } from '../../../components/templates/Guardian';
import { Username } from '@/components/templates/index';

export const config = {
  runtime: 'edge'
};

const data: GuardianData & Username = {
  numberOfTimes: 50,
  username: 'jayantbh'
};

const generateUsingVercel = async () => {
  return (
    await createImageUsingVercel(data, CardTypes.GUARDIAN_OF_PROD, 'browser')
  ).image;
};

export default generateUsingVercel;
