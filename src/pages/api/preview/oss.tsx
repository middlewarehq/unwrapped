import { createImageUsingVercel } from '@/api-helpers/vercel-generator';
import { CardTypes } from '../../../types/cards';
import { OSSContribsData } from '@/components/templates/OSSContribs';

export const config = {
  runtime: 'edge'
};

const data: OSSContribsData = {
  // up and down values for the graph
  trends: [32, 34, 9, 12, 42, 34, 1, 67, 43, 22, 12, 50]
};

const generateUsingVercel = async () => {
  return (
    await createImageUsingVercel(
      data as OSSContribsData,
      CardTypes.OSS_CONTRIBUTION,
      'browser'
    )
  ).image;
};

export default generateUsingVercel;
