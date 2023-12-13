import { ResponseError } from '@/utils/errors';
import {
  PullRequestEdge,
  PullRequest,
  Review
} from '../api-helpers/exapi-sdk/types';
import { getTopNKeys } from './utils';
import { logException } from '@/utils/logger';
import { sum } from 'ramda';
import { differenceInSeconds, parseISO } from 'date-fns';
import { DayOfWeek } from '@/constants/general';

export const getPRListAndMonthlyCountsFromGqlResponse = (
  edges?: PullRequestEdge[][]
) => {
  if (!edges) {
    logException('No data found to calculate stats');
    throw new ResponseError('No data found to calculate stats', 404);
  }

  const flat_prs = edges.flat().map((pr_node) => pr_node.node);
  const prs_monthly_counts = edges.map((monthly_prs) => monthly_prs.length);

  return [flat_prs, prs_monthly_counts] as const;
};

export const getReviewerReviewsCountMap = (
  pull_requests: Array<PullRequest>
): Record<string, number> => {
  let reviewer_name_to_pr_count_map: Record<string, number> = {};

  for (let pr of pull_requests) {
    let accountedReviewersForPR: Record<string, number> = {};

    for (let review_node of pr.reviews.edges) {
      const reviewer_login = review_node.node.author.login;

      if (reviewer_login in accountedReviewersForPR) {
        continue;
      }

      if (reviewer_login in reviewer_name_to_pr_count_map) {
        reviewer_name_to_pr_count_map[reviewer_login] += 1;
      } else {
        reviewer_name_to_pr_count_map[reviewer_login] = 1;
      }

      accountedReviewersForPR[reviewer_login] = 1;
    }
  }
  return reviewer_name_to_pr_count_map;
};

export const getAuthorPRCountsMap = (
  pullRequests: Array<PullRequest>
): Record<string, number> => {
  let authorNameToPrCountsMap: Record<string, number> = {};

  for (let pr of pullRequests) {
    let author = pr.author.login;
    if (!author) continue;

    if (author in authorNameToPrCountsMap) {
      authorNameToPrCountsMap[author] += 1;
    } else {
      authorNameToPrCountsMap[author] = 1;
    }
  }

  return authorNameToPrCountsMap;
};

export const getTotalCodeAdditions = (pullRequests: Array<PullRequest>) => {
  let totalAdditions = 0;

  if (!pullRequests) return totalAdditions;
  for (let pr of pullRequests) {
    totalAdditions += pr.additions;
  }

  return totalAdditions;
};

export const getTotalCodeDeletions = (pullRequests: Array<PullRequest>) => {
  let totalDeletions = 0;

  if (!pullRequests) return totalDeletions;
  for (let pr of pullRequests) {
    totalDeletions += pr.deletions;
  }

  return totalDeletions;
};

export const getTopNRecurringReviewers = (
  pullRequests: Array<PullRequest>,
  n?: number
) => {
  const reviewerReviewsCountMap: Record<string, number> =
    getReviewerReviewsCountMap(pullRequests);
  return getTopNKeys(reviewerReviewsCountMap, n);
};

export const getTopNRecurringAuthors = (
  pullRequests: Array<PullRequest>,
  n?: number
) => {
  const authorPRCountsMap: Record<string, number> =
    getAuthorPRCountsMap(pullRequests);
  return getTopNKeys(authorPRCountsMap, n);
};

export const splitPRsByDayNight = (
  prs: PullRequest[],
  timeZone: string
): { day: PullRequest[]; night: PullRequest[] } => {
  const dayPRs: PullRequest[] = [];
  const nightPRs: PullRequest[] = [];

  prs.forEach((pr) => {
    const createdAt = new Date(pr.createdAt);
    const localTime = new Date(createdAt.toLocaleString('en-US', { timeZone }));

    const startOfDay = new Date(localTime);
    startOfDay.setHours(8, 0, 0, 0);
    const endOfDay = new Date(localTime);
    endOfDay.setHours(18, 0, 0, 0);

    if (localTime >= startOfDay && localTime <= endOfDay) {
      dayPRs.push(pr);
    } else {
      nightPRs.push(pr);
    }
  });

  return { day: dayPRs, night: nightPRs };
};

export const getUserReviewCountWithRequestChanges = (
  pull_requests: PullRequest[],
  author: string
): number =>
  pull_requests.filter((pr) =>
    pr.reviews.edges.find(
      (rev) =>
        rev.node.author.login === author &&
        rev.node.state === 'CHANGES_REQUESTED'
    )
  ).length;

export const getCommitPercentile = (userCommitCount: number): number => {
  const commitCounts = [
    99727, 55127, 24692, 12298, 6132, 2697, 1672, 1157, 714, 481, 313, 233, 187,
    155, 81, 36, 26, 19, 7, 4, 3, 2, 1
  ];
  const percentiles = [
    0.001, 0.002, 0.005, 0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1, 2, 3, 4, 5, 10, 20,
    25, 30, 50, 60, 70, 80, 90
  ];
  let percentile = 0.001;
  for (let i in commitCounts) {
    if (userCommitCount > commitCounts[i]) break;

    percentile = percentiles[i];
  }
  return percentile;
};

export const removeBotReviews = (reviews: Review[]) => {
  if (!reviews) return [];
  return reviews.filter((review) => !review.author.login?.includes('[bot]'));
};

export const removeReviewsForUser = (reviews: Review[], userLogin: string) => {
  if (!reviews) return [];
  return reviews.filter((review) => !(review.author.login === userLogin));
};

const sortReviews = (reviews: Review[]) => {
  reviews.sort((review1, review2) => {
    const date1 = new Date(review1.createdAt);
    const date2 = new Date(review2.createdAt);
    return date1.getTime() - date2.getTime();
  });
};

export const getPRFirstResponseTimeInSeconds = (pr: PullRequest) => {
  let reviews = pr.reviews.edges.map((reviewEdge) => reviewEdge.node);
  if (!reviews?.length) return -1;

  reviews = removeReviewsForUser(reviews, pr.author.login);

  let nonBotReviews = removeBotReviews(reviews);
  if (!nonBotReviews?.length) return -1;

  sortReviews(nonBotReviews);

  const firstReview = nonBotReviews[0];

  return differenceInSeconds(
    parseISO(firstReview.createdAt),
    parseISO(pr.createdAt)
  );
};

export const getSumOfFirstResponseTimes = (prs: PullRequest[]) => {
  return sum(prs.map((pr) => Math.max(0, getPRFirstResponseTimeInSeconds(pr))));
};

export const getReworkTimeInSeconds = (pr: PullRequest) => {
  let reviews = pr.reviews.edges.map((reviewEdge) => reviewEdge.node);
  if (!reviews?.length) return -1;

  reviews = removeReviewsForUser(reviews, pr.author.login);

  let nonBotReviews = removeBotReviews(reviews);
  if (!nonBotReviews?.length) return -1;

  sortReviews(nonBotReviews);

  const approvedReviews = nonBotReviews.filter(
    (review) => review.state === 'APPROVED'
  );

  if (!approvedReviews?.length) return -1;

  return differenceInSeconds(
    parseISO(approvedReviews[0].createdAt),
    parseISO(nonBotReviews[0].createdAt)
  );
};

export const getSumOfReworkTimes = (prs: PullRequest[]) => {
  return sum(prs.map((pr) => Math.max(0, getReworkTimeInSeconds(pr))));
};

export const getMostProductiveHour = (
  prs: PullRequest[],
  timeZone: string
): number => {
  if (!prs?.length) return -1;

  let hourWisePrFrequencyBucket = new Array(24).fill(0);

  for (let pr of prs) {
    const createdAt = new Date(pr.createdAt);
    const localTime = new Date(createdAt.toLocaleString('en-US', { timeZone }));
    const hour = localTime.getHours();
    hourWisePrFrequencyBucket[hour] += 1;
  }
  return hourWisePrFrequencyBucket.indexOf(
    Math.max(...hourWisePrFrequencyBucket)
  );
};

export const getMostProductiveDayOfWeek = (
  prs: PullRequest[],
  timeZone: string
) => {
  if (!prs?.length) return -1;

  let hourWisePrFrequencyBucket = new Array(7).fill(0);

  for (let pr of prs) {
    const createdAt = new Date(pr.createdAt);
    const localTime = new Date(createdAt.toLocaleString('en-US', { timeZone }));
    const hour = localTime.getDay();
    hourWisePrFrequencyBucket[hour] += 1;
  }

  return DayOfWeek[
    hourWisePrFrequencyBucket.indexOf(Math.max(...hourWisePrFrequencyBucket))
  ];
};
