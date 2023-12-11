import { createImageUsingVercel } from '@/api-helpers/vercel-generator';
import { CardTypes } from '../../../types/cards';
import { ZenNinjaData } from '../../../components/templates/ZenNinja';
import { Username } from '@/components/templates';

export const config = {
  runtime: 'edge'
};

const data: ZenNinjaData & Username = {
  // up and down values for the graph
  trends: [32, 34, 9, 12, 42, 34, 1, 67, 43, 22, 12, 50],
  username: 'jayantbh'
};

const generateUsingVercel = async () => {
  return (await createImageUsingVercel(data, CardTypes.ZEN_OR_NINJA, 'browser'))
    .image;
};

export default generateUsingVercel;
