import { createImageUsingVercel } from '@/pages/api/image_gen/vercel_generator';
import { CardTypes } from '../types/cards';
import { CodeReviewsData } from '../image_gen/templates/CodeReviews';

export const config = {
  runtime: 'edge'
};

const data: CodeReviewsData = {
  topReviewer: 'jason',
  totalReviewers: 6
};

const generateUsingVercel = async () => {
  return (
    await createImageUsingVercel(data, CardTypes.TOP_REVIEWERS, 'browser')
  ).image;
};

export default generateUsingVercel;
