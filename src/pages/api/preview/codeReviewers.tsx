import { createImageUsingVercel } from '@/api-helpers/vercel-generator';
import { CardTypes } from '../../../types/cards';
import { CodeReviewsData } from '../../../components/templates/CodeReviews';
import { Username } from '@/components/templates';

export const config = {
  runtime: 'edge'
};

const data: CodeReviewsData & Username = {
  topReviewer: 'jason',
  totalReviewers: 6,
  username: 'jayantbh'
};

const generateUsingVercel = async () => {
  return (
    await createImageUsingVercel(data, CardTypes.TOP_REVIEWERS, 'browser')
  ).image;
};

export default generateUsingVercel;
