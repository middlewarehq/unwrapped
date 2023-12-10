import { createImageUsingVercel } from '@/pages/api/image_gen/vercel_generator';
import { CardTypes } from '../types/cards';
import { AuthoredReviewedData } from '@/pages/api/image_gen/templates/AuthoredReviewed';

export const config = {
  runtime: 'edge'
};

const data: AuthoredReviewedData = {
  authoredPrs: 82,
  reviewedPrs: 18
};

const generateUsingVercel = async () => {
  return (
    await createImageUsingVercel(
      data,
      CardTypes.PR_REVIEWED_VS_AUTHORED,
      'browser'
    )
  ).image;
};

export default generateUsingVercel;
