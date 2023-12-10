import { createImageUsingVercel } from '@/api-helpers/vercel-generator';
import { CardTypes } from '../../../types/cards';
import { CodeReviewsData } from '../../../components/templates/CodeReviews';

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
