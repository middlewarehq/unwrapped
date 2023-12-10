import { RepositoryContributionData } from '@/exapi_sdk/types';
import { AuthoredReviewedData } from '../image_gen/templates/AuthoredReviewed';
import { ContributionsData } from '../image_gen/templates/Contributions';
import { GuardianData } from '../image_gen/templates/Guardian';
import { IntroCardProps } from '../image_gen/templates/IntroCard';
import {
  GitHubDataResponse,
  GithubRepositoryContributionData
} from '../types/ApiResponses';
import { TimeOfTheDayData } from '@/pages/api/image_gen/templates/TimeOfTheDay';
import { CardTypes } from '@/pages/api/types/cards';

export const getDataFromGithubResponse = (data: GitHubDataResponse) => {
  const intro: IntroCardProps | null = {
    username: data.user.login,
    year: new Date().getFullYear()
  };

  const guardian: GuardianData | null = {
    numberOfTimes: data.authored_monthly_pr_counts.reduce(
      (acc, curr) => acc + curr,
      0
    )
  };

  const contributions: ContributionsData | null = {
    contributions: data.total_contributions,
    percentile: data.contribution_percentile
  };

  const authoredVsReviewedPRs: AuthoredReviewedData | null = {
    authoredPrs: data.authored_monthly_pr_counts.reduce(
      (acc, curr) => acc + curr,
      0
    ),
    reviewedPrs: data.reviewed_monthly_pr_counts.reduce(
      (acc, curr) => acc + curr,
      0
    )
  };

  const timeBasedData: TimeOfTheDayData | null = {
    prsDuringDay: data.prs_opened_during_day,
    totalPrs: data.prs_opened_during_day + data.prs_opened_during_night
  };

  return {
    [CardTypes.UNWRAPPED_INTRO]: intro,
    [CardTypes.GUARDIAN_OF_PROD]: guardian,
    [CardTypes.YOUR_CONTRIBUTIONS]: contributions,
    [CardTypes.PR_REVIEWED_VS_AUTHORED]: authoredVsReviewedPRs,
    [CardTypes.DAY_NIGHT_CYCLE]: timeBasedData
  } as Record<
    CardTypes,
    | IntroCardProps
    | GuardianData
    | ContributionsData
    | AuthoredReviewedData
    | TimeOfTheDayData
    | null
  >;
};

export const getGithubRepositoryContributionData = (
  repoData: RepositoryContributionData
): GithubRepositoryContributionData => {
  return {
    org_name: repoData.repository.owner.login,
    repo_name: repoData.repository.name,
    org_avatar_url: repoData.repository.owner.avatarUrl,
    contributions_count: repoData.contributions.totalCount
  };
};
