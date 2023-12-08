import { getReviewerReviewsCountMap } from '../analytics';
import { getPullRequest, getReview } from '../test_utils/factories';

test('getReviewerReviewsCountMap returns empty object for empty PR Array', () => {
  expect(getReviewerReviewsCountMap([])).toStrictEqual({});
});

test('getReviewerReviewsCountMap returns correct reviews count.', () => {
  const reviewer1 = 'samad-yar-khan';
  const reviewer2 = 'jayantbh';
  const reviewer3 = 'shivam-bit';
  const reviewer4 = 'varun';

  const review1 = getReview({ reviewerLogin: reviewer1 });
  const review2 = getReview({ reviewerLogin: reviewer2 });
  const review3 = getReview({ reviewerLogin: reviewer3 });
  const review4 = getReview({ reviewerLogin: reviewer4 });

  const pr1 = getPullRequest({ reviews: [review1, review1, review1] });
  const pr2 = getPullRequest({ reviews: [review1, review2, review2] });
  const pr3 = getPullRequest({ reviews: [review1, review2, review3] });
  const pr4 = getPullRequest({ reviews: [review1, review2, review4] });

  expect(getReviewerReviewsCountMap([pr1])).toStrictEqual({
    'samad-yar-khan': 1
  });
  expect(getReviewerReviewsCountMap([pr1, pr2])).toStrictEqual({
    'samad-yar-khan': 2,
    jayantbh: 1
  });
  expect(getReviewerReviewsCountMap([pr1, pr2, pr3, pr4])).toStrictEqual({
    'samad-yar-khan': 4,
    jayantbh: 3,
    'shivam-bit': 1,
    varun: 1
  });
});
