import { createImageUsingVercel } from '@/api-helpers/vercel-generator';
import { CardTypes } from '../../../types/cards';
import { ContributionsData } from '@/components/templates/Contributions';

export const config = {
  runtime: 'edge'
};

const data: ContributionsData = {
  contributions: 20312,
  percentile: 2
};

const generateUsingVercel = async () => {
  return (
    await createImageUsingVercel(data, CardTypes.YOUR_CONTRIBUTIONS, 'browser')
  ).image;
};

export default generateUsingVercel;
