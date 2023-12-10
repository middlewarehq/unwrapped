import { KeyValueObject } from '@/types';
import { PullRequestEdge, PullRequest } from '../exapi_sdk/types';
import { getTopNKeys } from './utils';

export const getPRListAndMonthlyCountsFromGqlResponse = (
  edges?: PullRequestEdge[][]
) => {
  if (!edges) throw new Error('No data found to calculate stats');

  const flat_prs = edges.flat().map((pr_node) => pr_node.node);
  const prs_monthly_counts = edges.map((monthly_prs) => monthly_prs.length);

  return [flat_prs, prs_monthly_counts] as const;
};

export const getReviewerReviewsCountMap = (
  pull_requests: Array<PullRequest>
): KeyValueObject => {
  let reviewer_name_to_pr_count_map: KeyValueObject = {};

  for (let pr of pull_requests) {
    let accountedReviewersForPR: any = {};

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
): KeyValueObject => {
  let authorNameToPrCountsMap: KeyValueObject = {};

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
  const reviewerReviewsCountMap: KeyValueObject =
    getReviewerReviewsCountMap(pullRequests);
  return getTopNKeys(reviewerReviewsCountMap, n);
};

export const getTopNRecurringAuthors = (
  pullRequests: Array<PullRequest>,
  n?: number
) => {
  const authorPRCountsMap: KeyValueObject = getAuthorPRCountsMap(pullRequests);
  return getTopNKeys(authorPRCountsMap, n);
};
