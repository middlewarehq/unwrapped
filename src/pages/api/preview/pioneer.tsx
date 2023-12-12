import { createImageUsingVercel } from '@/api-helpers/vercel-generator';
import { CardTypes } from '../../../types/cards';
import { Username } from '@/components/templates/index';

export const config = {
  runtime: 'edge'
};

const data: Username = {
  username: 'jayantbh'
};

const generateUsingVercel = async () => {
  return (await createImageUsingVercel(data, CardTypes.PIONEER, 'browser'))
    .image;
};

export default generateUsingVercel;
