import { createImageUsingVercel } from '@/api-helpers/vercel-generator';
import { CardTypes } from '../../../types/cards';
import { ZenNinjaData } from '../../../components/templates/ZenNinja';

export const config = {
  runtime: 'edge'
};

const data: ZenNinjaData = {
  // up and down values for the graph
  trends: [32, 34, 9, 12, 42, 34, 1, 67, 43, 22, 12, 50]
};

const generateUsingVercel = async () => {
  return (
    await createImageUsingVercel(
      data as ZenNinjaData,
      CardTypes.ZEN_OR_NINJA,
      'browser'
    )
  ).image;
};

export default generateUsingVercel;
