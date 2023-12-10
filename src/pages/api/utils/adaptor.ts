import { RepositoryContributionData } from '@/exapi-sdk/types';
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
import { ZenNinjaData } from '../image_gen/templates/ZenNinja';
import { StreakData } from '../image_gen/templates/Streak';
import { CodeReviewsData } from '../image_gen/templates/CodeReviews';

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

  const zenOrNinja: ZenNinjaData | null = {
    trends: Object.entries(data.monthly_contributions)
      .sort(([a], [b]) => parseInt(b) - parseInt(a))
      .map(([, contributions]) => contributions)
  };

  const contributionStreak: StreakData | null = {
    streak: data.longest_streak
  };

  const codeReviewerStats: CodeReviewsData | null = data.top_reviewers?.length
    ? {
        topReviewer: data.top_reviewers[0],
        totalReviewers: data.top_reviewers.length
      }
    : null;

  return {
    [CardTypes.UNWRAPPED_INTRO]: intro,
    [CardTypes.GUARDIAN_OF_PROD]: guardian,
    [CardTypes.YOUR_CONTRIBUTIONS]: contributions,
    [CardTypes.PR_REVIEWED_VS_AUTHORED]: authoredVsReviewedPRs,
    [CardTypes.DAY_NIGHT_CYCLE]: timeBasedData,
    [CardTypes.ZEN_OR_NINJA]: zenOrNinja,
    [CardTypes.CONTRIBUTION_STREAK]: contributionStreak,
    [CardTypes.TOP_REVIEWERS]: codeReviewerStats
  } as Record<
    CardTypes,
    | IntroCardProps
    | GuardianData
    | ContributionsData
    | AuthoredReviewedData
    | TimeOfTheDayData
    | ZenNinjaData
    | StreakData
    | CodeReviewsData
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
