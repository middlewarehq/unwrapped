import { PullRequestEdge, PullRequest } from '../exapi_sdk/types';

export const getPRListAndMonthlyCountsFromGqlResponse = (
  edges?: PullRequestEdge[][]
) => {
  if (!edges) throw new Error('No data found to calculate stats');

  const flat_prs = edges.flat();
  const prs_monthly_counts = edges.map((monthly_prs) => monthly_prs.length);

  return [flat_prs, prs_monthly_counts];
};

export const getReviewerReviewsCountMap = (
  pull_requests: Array<PullRequest>
) => {
  let reviewer_name_to_pr_count_map: any = {};

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
