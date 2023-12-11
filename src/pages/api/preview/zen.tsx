import { createImageUsingVercel } from '@/api-helpers/vercel-generator';
import { CardTypes } from '../../../types/cards';
import { ZenNinjaData } from '../../../components/templates/ZenNinja';
import { Username } from '@/components/templates';
import { randInt } from '@/utils/number';

export const config = {
  runtime: 'edge'
};

const data: ZenNinjaData & Username = {
  trends: Array.from({ length: 12 }, () => randInt(-1, 1) + 20),
  username: 'jayantbh'
};

const generateUsingVercel = async () => {
  return (await createImageUsingVercel(data, CardTypes.ZEN_OR_NINJA, 'browser'))
    .image;
};

export default generateUsingVercel;
