import { createImageUsingVercel } from '@/api-helpers/vercel-generator';
import { CardTypes } from '../../../types/cards';
import { ZenNinjaData } from '../../../components/templates/ZenNinja';
import { Username } from '@/components/templates';

export const config = {
  runtime: 'edge'
};

const data: ZenNinjaData & Username = {
  trends: [48, 69, 9, 8, 5, 7, 1, 67, 43, 10, 12, 7],
  username: 'jayantbh'
};

const generateUsingVercel = async () => {
  return (await createImageUsingVercel(data, CardTypes.ZEN_OR_NINJA, 'browser'))
    .image;
};

export default generateUsingVercel;
