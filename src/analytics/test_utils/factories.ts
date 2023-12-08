import { Review, ReviewEdge } from '@/exapi_sdk/types';
import { PullRequestGeneratorParams, ReviewGeneratorParams } from './types';

export const getPullRequest = ({
  authorLogin = 'samad-yar-khan',
  repoOwner = 'middlewarehq',
  repoName = 'unwrapped',
  createdAt = '2023-02-01T14:04:37Z',
  mergedAt = '2023-02-03T14:04:37Z',
  additions = 0,
  deletions = 0,
  reviews = []
}: PullRequestGeneratorParams): any => {
  return {
    author: {
      login: authorLogin
    },
    repository: {
      name: repoName,
      owner: {
        login: repoOwner
      }
    },
    createdAt,
    mergedAt,
    additions,
    deletions,
    reviews: {
      edges: reviews.map(getReviewEdge)
    }
  };
};

export const getReview = (args: ReviewGeneratorParams): Review => {
  const defaults = {
    reviewerLogin: 'dhruv',
    createdAt: '2023-02-01T14:04:37Z',
    state: 'COMMENTED'
  };

  const { createdAt, reviewerLogin, state } = { ...defaults, ...args };

  return {
    author: {
      login: reviewerLogin
    },
    createdAt,
    state
  };
};

export const getReviewEdge = (review: Review): ReviewEdge => {
  return {
    node: review
  };
};
