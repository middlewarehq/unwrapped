import { Review } from '@/exapi_sdk/types';

export interface PullRequestGeneratorParams {
  authorLogin?: string;
  repoOwner?: string;
  repoName?: string;
  createdAt?: string;
  mergedAt?: string;
  additions?: number;
  deletions?: number;
  reviews?: Review[];
}

export interface ReviewGeneratorParams {
  reviewerLogin?: string;
  createdAt?: string;
  state?: Review['state'];
}
