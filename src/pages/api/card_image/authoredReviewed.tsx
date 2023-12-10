import { createImageUsingVercel } from '@/pages/api/image_gen/vercel_generator';
import { CardTypes } from '../types/cards';
import { AuthoredReviewedData } from '@/pages/api/image_gen/templates/AuthoredReviewed';

export const config = {
  runtime: 'edge'
};

// eg: http://localhost:3000/api/card_image/authoredReviewed?authoredPrs=10&reviewedPrs=20
const authoredReviewedImage = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const authoredPrs = searchParams.get('authoredPrs');
  const reviewedPrs = searchParams.get('reviewedPrs');

  const data = {
    authoredPrs: parseInt(authoredPrs || '0'),
    reviewedPrs: parseInt(reviewedPrs || '0')
  };
  return (
    await createImageUsingVercel(
      data as AuthoredReviewedData,
      CardTypes.PR_REVIEWED_VS_AUTHORED,
      'browser'
    )
  ).image;
};

export default authoredReviewedImage;
