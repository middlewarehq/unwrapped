import { getReviewerReviewsCountMap, getAuthorPRCountsMap } from '../analytics';
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

test('getAuthorPRCountsMap returns empty object for empty PR Array', () => {
  expect(getAuthorPRCountsMap([])).toStrictEqual({});
});

test('getAuthorPRCountsMap returns correct PR counts for users', () => {
  expect(getAuthorPRCountsMap([])).toStrictEqual({});

  const author1 = 'samad-yar-khan';
  const author2 = 'jayantbh';
  const author3 = 'shivam-bit';
  const author4 = 'varun';
  const author5 = 'amogh';

  const pr1 = getPullRequest({ authorLogin: author1 });
  const pr2 = getPullRequest({ authorLogin: author2 });
  const pr3 = getPullRequest({ authorLogin: author3 });
  const pr4 = getPullRequest({ authorLogin: author4 });
  const pr5 = getPullRequest({ authorLogin: author1 });
  const pr6 = getPullRequest({ authorLogin: author2 });
  const pr7 = getPullRequest({ authorLogin: author3 });
  const pr8 = getPullRequest({ authorLogin: author4 });
  const pr9 = getPullRequest({ authorLogin: author1 });
  const pr10 = getPullRequest({ authorLogin: author2 });
  const pr11 = getPullRequest({ authorLogin: author5 });

  expect(getAuthorPRCountsMap([pr1, pr5, pr9])).toStrictEqual({
    'samad-yar-khan': 3
  });
  expect(getAuthorPRCountsMap([pr1, pr2, pr5, pr9])).toStrictEqual({
    'samad-yar-khan': 3,
    jayantbh: 1
  });
  expect(
    getAuthorPRCountsMap([
      pr1,
      pr2,
      pr3,
      pr4,
      pr5,
      pr6,
      pr7,
      pr8,
      pr9,
      pr10,
      pr11
    ])
  ).toStrictEqual({
    'samad-yar-khan': 3,
    jayantbh: 3,
    'shivam-bit': 2,
    varun: 2,
    amogh: 1
  });
});
