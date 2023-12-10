import {
  getReviewerReviewsCountMap,
  getAuthorPRCountsMap,
  getTotalCodeAdditions,
  getTotalCodeDeletions,
  getTopNRecurringReviewers,
  getTopNRecurringAuthors,
  splitPRsByDayNight
} from '../pr_analytics';
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

test('getTotalCodeAdditions returns 0 for empty PR Array', () => {
  expect(getTotalCodeAdditions([])).toStrictEqual(0);
});

test('getTotalCodeAdditions returns correct value for PR Additions Array', () => {
  const author1 = 'samad-yar-khan';
  const author2 = 'jayantbh';
  const author3 = 'shivam-bit';
  const author4 = 'varun';
  const author5 = 'amogh';

  const pr1 = getPullRequest({
    authorLogin: author1,
    additions: 0,
    deletions: 100
  });
  const pr2 = getPullRequest({
    authorLogin: author2,
    additions: 1,
    deletions: 200
  });
  const pr3 = getPullRequest({
    authorLogin: author3,
    additions: 2,
    deletions: 300
  });
  const pr4 = getPullRequest({
    authorLogin: author4,
    additions: 3,
    deletions: 400
  });
  const pr5 = getPullRequest({
    authorLogin: author1,
    additions: 4,
    deletions: 500
  });
  const pr6 = getPullRequest({
    authorLogin: author2,
    additions: 5,
    deletions: 600
  });
  const pr7 = getPullRequest({
    authorLogin: author3,
    additions: 10,
    deletions: 700
  });
  const pr8 = getPullRequest({
    authorLogin: author4,
    additions: 20,
    deletions: 800
  });
  const pr9 = getPullRequest({
    authorLogin: author1,
    additions: 30,
    deletions: 900
  });
  const pr10 = getPullRequest({
    authorLogin: author2,
    additions: 40,
    deletions: 1000
  });
  const pr11 = getPullRequest({
    authorLogin: author5,
    additions: 50,
    deletions: 1100
  });

  expect(getTotalCodeAdditions([pr1])).toStrictEqual(0);
  expect(getTotalCodeAdditions([pr1, pr2, pr3, pr4, pr5, pr6])).toStrictEqual(
    15
  );
  expect(
    getTotalCodeAdditions([
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
  ).toStrictEqual(165);
});

test('getTotalCodeDeletions returns 0 for empty PR Array', () => {
  expect(getTotalCodeDeletions([])).toStrictEqual(0);
});

test('getTotalCodeDeletions returns correct value for PR Additions Array', () => {
  const author1 = 'samad-yar-khan';
  const author2 = 'jayantbh';
  const author3 = 'shivam-bit';
  const author4 = 'varun';
  const author5 = 'amogh';

  const pr0 = getPullRequest({
    authorLogin: author1,
    additions: 0,
    deletions: 0
  });
  const pr1 = getPullRequest({
    authorLogin: author1,
    additions: 0,
    deletions: 100
  });
  const pr2 = getPullRequest({
    authorLogin: author2,
    additions: 1,
    deletions: 200
  });
  const pr3 = getPullRequest({
    authorLogin: author3,
    additions: 2,
    deletions: 300
  });
  const pr4 = getPullRequest({
    authorLogin: author4,
    additions: 3,
    deletions: 400
  });
  const pr5 = getPullRequest({
    authorLogin: author1,
    additions: 4,
    deletions: 500
  });
  const pr6 = getPullRequest({
    authorLogin: author2,
    additions: 5,
    deletions: 600
  });
  const pr7 = getPullRequest({
    authorLogin: author3,
    additions: 10,
    deletions: 700
  });
  const pr8 = getPullRequest({
    authorLogin: author4,
    additions: 20,
    deletions: 800
  });
  const pr9 = getPullRequest({
    authorLogin: author1,
    additions: 30,
    deletions: 900
  });
  const pr10 = getPullRequest({
    authorLogin: author2,
    additions: 40,
    deletions: 1000
  });
  const pr11 = getPullRequest({
    authorLogin: author5,
    additions: 50,
    deletions: 1100
  });

  expect(getTotalCodeDeletions([pr0])).toStrictEqual(0);
  expect(getTotalCodeDeletions([pr1, pr2, pr3, pr4, pr5, pr6])).toStrictEqual(
    2100
  );
  expect(
    getTotalCodeDeletions([
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
  ).toStrictEqual(6600);
});

test('getTopNRecurringReviewers returns empty list for empty PRs List.', () => {
  expect(getTopNRecurringReviewers([])).toStrictEqual([]);
  expect(getTopNRecurringReviewers([], 100)).toStrictEqual([]);
});

test('getTopNRecurringReviewers returns complete list for PRs List and invalid n', () => {
  const reviewer1 = 'samad-yar-khan';
  const reviewer2 = 'jayantbh';
  const reviewer3 = 'shivam-bit';
  const reviewer4 = 'varun';

  const review1 = getReview({ reviewerLogin: reviewer1 });
  const review2 = getReview({ reviewerLogin: reviewer2 });
  const review3 = getReview({ reviewerLogin: reviewer3 });
  const review4 = getReview({ reviewerLogin: reviewer4 });

  const pr1 = getPullRequest({ reviews: [review1, review1, review1] });
  const pr2 = getPullRequest({ reviews: [review1, review2, review2, review3] });
  const pr3 = getPullRequest({ reviews: [review1, review2, review3] });
  const pr4 = getPullRequest({ reviews: [review1, review2, review4] });

  expect(getTopNRecurringReviewers([pr1], -1)).toStrictEqual([
    'samad-yar-khan'
  ]);
  expect(getTopNRecurringReviewers([pr1, pr2, pr3, pr4])).toStrictEqual([
    'samad-yar-khan',
    'jayantbh',
    'shivam-bit',
    'varun'
  ]);
  expect(
    getTopNRecurringReviewers([pr1, pr2, pr3, pr4], undefined)
  ).toStrictEqual(['samad-yar-khan', 'jayantbh', 'shivam-bit', 'varun']);
  expect(getTopNRecurringReviewers([pr1, pr2, pr3, pr4], -20)).toStrictEqual([
    'samad-yar-khan',
    'jayantbh',
    'shivam-bit',
    'varun'
  ]);
});

test('getTopNRecurringReviewers returns correct top Reviewers for valid N.', () => {
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

  expect(getTopNRecurringReviewers([pr1, pr4], 0)).toStrictEqual([]);
  expect(getTopNRecurringReviewers([pr1, pr2, pr3, pr4], 20)).toStrictEqual([
    'samad-yar-khan',
    'jayantbh',
    'shivam-bit',
    'varun'
  ]);
  expect(getTopNRecurringReviewers([pr1, pr2, pr3, pr4], 2.3)).toStrictEqual([
    'samad-yar-khan',
    'jayantbh'
  ]);
  expect(getTopNRecurringReviewers([pr1, pr2, pr3, pr4], 3)).toStrictEqual([
    'samad-yar-khan',
    'jayantbh',
    'shivam-bit'
  ]);
});

test('getTopNRecurringReviewers returns different reviewers based on PRs order and given reviewers with equal number of reviewed PRs', () => {
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
  const pr3 = getPullRequest({ reviews: [review3] });
  const pr4 = getPullRequest({ reviews: [review4] });

  // varun and shivam-bit reviewed same number of PRs but the one who's reviewed PRs are placed at lower index of input Array will be shown in top 3, ignoring one reviewer with same number of reviews depending on PRs order.

  expect(getTopNRecurringReviewers([pr1, pr2, pr3, pr4], 3)).toStrictEqual([
    'samad-yar-khan',
    'jayantbh',
    'shivam-bit'
  ]);

  expect(getTopNRecurringReviewers([pr1, pr2, pr4, pr3], 3)).toStrictEqual([
    'samad-yar-khan',
    'jayantbh',
    'varun'
  ]);
});

test('getTopNRecurringAuthors returns empty list for empty PRs List.', () => {
  expect(getTopNRecurringAuthors([])).toStrictEqual([]);
  expect(getTopNRecurringAuthors([], 100)).toStrictEqual([]);
});

test('getTopNRecurringAuthors returns all authors for valid N.', () => {
  const author1 = 'samad-yar-khan';
  const author2 = 'jayantbh';
  const author3 = 'shivam-bit';
  const author4 = 'varun';
  const author5 = 'amogh';

  const pr1 = getPullRequest({ authorLogin: author1 });
  const pr2 = getPullRequest({ authorLogin: author1 });
  const pr3 = getPullRequest({ authorLogin: author1 });
  const pr4 = getPullRequest({ authorLogin: author1 });
  const pr5 = getPullRequest({ authorLogin: author1 });
  const pr6 = getPullRequest({ authorLogin: author2 });
  const pr7 = getPullRequest({ authorLogin: author2 });
  const pr8 = getPullRequest({ authorLogin: author2 });
  const pr9 = getPullRequest({ authorLogin: author2 });
  const pr10 = getPullRequest({ authorLogin: author3 });
  const pr11 = getPullRequest({ authorLogin: author3 });
  const pr12 = getPullRequest({ authorLogin: author3 });
  const pr13 = getPullRequest({ authorLogin: author4 });
  const pr14 = getPullRequest({ authorLogin: author4 });
  const pr15 = getPullRequest({ authorLogin: author5 });
  const pr16 = getPullRequest({ authorLogin: author5 });

  expect(getTopNRecurringAuthors([pr1], -1)).toStrictEqual(['samad-yar-khan']);

  expect(
    getTopNRecurringAuthors([
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
      pr11,
      pr12,
      pr13,
      pr14,
      pr15,
      pr16
    ])
  ).toStrictEqual([
    'samad-yar-khan',
    'jayantbh',
    'shivam-bit',
    'varun',
    'amogh'
  ]);

  expect(
    getTopNRecurringAuthors(
      [
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
        pr11,
        pr12,
        pr13,
        pr14,
        pr15,
        pr16
      ],
      undefined
    )
  ).toStrictEqual([
    'samad-yar-khan',
    'jayantbh',
    'shivam-bit',
    'varun',
    'amogh'
  ]);

  expect(
    getTopNRecurringAuthors(
      [
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
        pr11,
        pr12,
        pr13,
        pr14,
        pr15,
        pr16
      ],
      -20
    )
  ).toStrictEqual([
    'samad-yar-khan',
    'jayantbh',
    'shivam-bit',
    'varun',
    'amogh'
  ]);
});

test('getTopNRecurringAuthors returns correct top n authors valid n', () => {
  const author1 = 'samad-yar-khan';
  const author2 = 'jayantbh';
  const author3 = 'shivam-bit';
  const author4 = 'varun';
  const author5 = 'amogh';

  const pr1 = getPullRequest({ authorLogin: author1 });
  const pr2 = getPullRequest({ authorLogin: author1 });
  const pr3 = getPullRequest({ authorLogin: author1 });
  const pr4 = getPullRequest({ authorLogin: author1 });
  const pr5 = getPullRequest({ authorLogin: author1 });
  const pr6 = getPullRequest({ authorLogin: author2 });
  const pr7 = getPullRequest({ authorLogin: author2 });
  const pr8 = getPullRequest({ authorLogin: author2 });
  const pr9 = getPullRequest({ authorLogin: author2 });
  const pr10 = getPullRequest({ authorLogin: author3 });
  const pr11 = getPullRequest({ authorLogin: author3 });
  const pr12 = getPullRequest({ authorLogin: author3 });
  const pr13 = getPullRequest({ authorLogin: author4 });
  const pr14 = getPullRequest({ authorLogin: author4 });
  const pr15 = getPullRequest({ authorLogin: author5 });
  const pr16 = getPullRequest({ authorLogin: author5 });

  expect(getTopNRecurringAuthors([pr1, pr2], 0)).toStrictEqual([]);

  expect(
    getTopNRecurringAuthors([
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
      pr11,
      pr12,
      pr13,
      pr14,
      pr15,
      pr16
    ])
  ).toStrictEqual([
    'samad-yar-khan',
    'jayantbh',
    'shivam-bit',
    'varun',
    'amogh'
  ]);

  expect(
    getTopNRecurringAuthors(
      [
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
        pr11,
        pr12,
        pr13,
        pr14,
        pr15,
        pr16
      ],
      3
    )
  ).toStrictEqual(['samad-yar-khan', 'jayantbh', 'shivam-bit']);

  expect(
    getTopNRecurringAuthors(
      [
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
        pr11,
        pr12,
        pr13,
        pr14,
        pr15
      ],
      100
    )
  ).toStrictEqual([
    'samad-yar-khan',
    'jayantbh',
    'shivam-bit',
    'varun',
    'amogh'
  ]);
});

test('getTopNRecurringAuthors returns different authors based on PRs order and given authors with equal number of PRs', () => {
  const author1 = 'samad-yar-khan';
  const author2 = 'jayantbh';
  const author3 = 'shivam-bit';
  const author4 = 'varun';
  const author5 = 'amogh';

  const pr1 = getPullRequest({ authorLogin: author1 });
  const pr2 = getPullRequest({ authorLogin: author1 });
  const pr3 = getPullRequest({ authorLogin: author1 });
  const pr4 = getPullRequest({ authorLogin: author1 });
  const pr5 = getPullRequest({ authorLogin: author1 });
  const pr6 = getPullRequest({ authorLogin: author2 });
  const pr7 = getPullRequest({ authorLogin: author2 });
  const pr8 = getPullRequest({ authorLogin: author2 });
  const pr9 = getPullRequest({ authorLogin: author2 });
  const pr10 = getPullRequest({ authorLogin: author3 });
  const pr11 = getPullRequest({ authorLogin: author3 });
  const pr12 = getPullRequest({ authorLogin: author3 });
  const pr13 = getPullRequest({ authorLogin: author4 });
  const pr14 = getPullRequest({ authorLogin: author4 });
  const pr15 = getPullRequest({ authorLogin: author5 });
  const pr16 = getPullRequest({ authorLogin: author5 });

  //varun and amogh have same number of PRs but come in top 4 depending who's PRs are at start of list.

  expect(
    getTopNRecurringAuthors(
      [
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
        pr11,
        pr12,
        pr13,
        pr14,
        pr16,
        pr15
      ],
      4
    )
  ).toStrictEqual(['samad-yar-khan', 'jayantbh', 'shivam-bit', 'varun']);

  expect(
    getTopNRecurringAuthors(
      [
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
        pr11,
        pr12,
        pr16,
        pr15,
        pr13,
        pr14
      ],
      4
    )
  ).toStrictEqual(['samad-yar-khan', 'jayantbh', 'shivam-bit', 'amogh']);
});

test('splitPRsByDayNight correctly splits prs into day and night', () => {
  const author1 = 'samad-yar-khan';

  const pr1 = getPullRequest({
    authorLogin: author1,
    createdAt: '2023-03-31T21:11:27Z'
  });
  const pr2 = getPullRequest({
    authorLogin: author1,
    createdAt: '2023-03-31T21:11:27Z'
  });
  const pr3 = getPullRequest({
    authorLogin: author1,
    createdAt: '2023-03-31T21:11:27Z'
  });
  const pr4 = getPullRequest({
    authorLogin: author1,
    createdAt: '2023-03-31T01:11:27Z'
  });
  const pr5 = getPullRequest({
    authorLogin: author1,
    createdAt: '2023-03-31T15:11:27Z'
  });
  const pr6 = getPullRequest({
    authorLogin: author1,
    createdAt: '2023-03-31T16:11:27Z'
  });
  const pr7 = getPullRequest({
    authorLogin: author1,
    createdAt: '2023-03-31T17:11:27Z'
  });
  const pr8 = getPullRequest({
    authorLogin: author1,
    createdAt: '2023-03-31T11:11:27Z'
  });
  const pr9 = getPullRequest({
    authorLogin: author1,
    createdAt: '2023-03-31T14:11:27Z'
  });

  expect(splitPRsByDayNight([], 'UTC')).toStrictEqual({ day: [], night: [] });
  expect(splitPRsByDayNight([pr1, pr2, pr3], 'UTC')).toStrictEqual({
    day: [],
    night: [pr1, pr2, pr3]
  });
  expect(splitPRsByDayNight([pr5, pr6, pr7, pr8, pr9], 'UTC')).toStrictEqual({
    day: [pr5, pr6, pr7, pr8, pr9],
    night: []
  });
  expect(
    splitPRsByDayNight([pr1, pr2, pr3, pr4, pr5, pr6, pr7, pr8, pr9], 'UTC')
  ).toStrictEqual({
    day: [pr5, pr6, pr7, pr8, pr9],
    night: [pr1, pr2, pr3, pr4]
  });
  expect(
    splitPRsByDayNight([pr1, pr2, pr3, pr4, pr5, pr6, pr7, pr8, pr9], 'IST')
  ).toStrictEqual({
    day: [pr8],
    night: [pr1, pr2, pr3, pr4, pr5, pr6, pr7, pr9]
  });
});
