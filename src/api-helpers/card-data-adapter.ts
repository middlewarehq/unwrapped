import { RepositoryContributionData } from '@/api-helpers/exapi-sdk/types';
import { AuthoredReviewedData } from '@/components/templates/AuthoredReviewed';
import { ContributionsData } from '@/components/templates/Contributions';
import { GuardianData } from '@/components/templates/Guardian';
import { IntroCardProps } from '@/components/templates/IntroCard';
import {
  GitHubDataResponse,
  GithubRepositoryContributionData
} from '../types/api-responses';
import { TimeOfTheDayData } from '@/components/templates/TimeOfTheDay';
import { CardTypes } from '@/types/cards';
import { ZenNinjaData } from '@/components/templates/ZenNinja';
import { StreakData } from '@/components/templates/Streak';
import { CodeReviewsData } from '@/components/templates/CodeReviews';
import { OSSContribsData } from '@/components/templates/OSSContribs';
import { sum } from 'ramda';
import { Username } from '@/components/templates/index';
import { DependantsData } from '@/components/templates/Dependants';

export const getDataFromGithubResponse = (data: GitHubDataResponse) => {
  const guardian: GuardianData | null =
    data.reviewed_prs_with_requested_changes_count > 2
      ? {
          numberOfTimes: data.reviewed_prs_with_requested_changes_count
        }
      : null;

  const contributions: ContributionsData | null =
    data.total_contributions > 0
      ? {
          contributions: data.total_contributions,
          percentile: data.contribution_percentile
        }
      : null;

  const totalAuthored = data.authored_monthly_pr_counts.reduce(
    (acc, curr) => acc + curr,
    0
  );
  const totalReviewed = data.reviewed_monthly_pr_counts.reduce(
    (acc, curr) => acc + curr,
    0
  );

  const totalPrs = totalAuthored + totalReviewed;

  const authoredVsReviewedPRs: AuthoredReviewedData | null =
    totalPrs > 10
      ? {
          authoredPrs: totalAuthored,
          reviewedPrs: totalReviewed
        }
      : null;

  const timeBasedData: TimeOfTheDayData | null = data.total_contributions
    ? {
        prsDuringDay: data.prs_opened_during_day,
        totalPrs: data.prs_opened_during_day + data.prs_opened_during_night,
        productiveDay: data.weekday_with_max_opened_prs as string,
        productiveHour: data.hour_with_max_opened_prs as number
      }
    : null;

  const zenOrNinja: ZenNinjaData | null =
    data.total_contributions > 50
      ? { trends: data.weekly_contributions }
      : null;

  const contributionStreak: StreakData | null =
    data.longest_streak > 3
      ? {
          streak: data.longest_streak
        }
      : null;

  const codeReviewerStats: CodeReviewsData | null = data.top_reviewers?.length
    ? {
        topReviewer: data.top_reviewers[0],
        totalReviewers: data.top_reviewers.length
      }
    : null;

  const total_oss = sum(
    data.oss_contributions.map((c) => c.contributions_count)
  );

  const ossContribsData: OSSContribsData | null =
    total_oss > 50
      ? {
          contribs: data.oss_contributions
        }
      : null;

  const userReviewers: DependantsData | null =
    data.top_reviewers.length >= 2
      ? {
          userAvatar: data.user.avatar_url,
          dependants: data.top_reviewers,
          username: data.user.login
        }
      : null;

  const nonIntroCardData = {
    [CardTypes.GUARDIAN_OF_PROD]: guardian,
    [CardTypes.YOUR_CONTRIBUTIONS]: contributions,
    [CardTypes.PR_REVIEWED_VS_AUTHORED]: authoredVsReviewedPRs,
    [CardTypes.DAY_NIGHT_CYCLE]: timeBasedData,
    [CardTypes.ZEN_OR_NINJA]: zenOrNinja,
    [CardTypes.CONTRIBUTION_STREAK]: contributionStreak,
    [CardTypes.TOP_REVIEWERS]: codeReviewerStats,
    [CardTypes.OSS_CONTRIBUTION]: ossContribsData,
    [CardTypes.IT_TAKES_A_VILLAGE]: userReviewers
  };

  const hasAnyData = !!Object.values(nonIntroCardData).filter(Boolean).length;

  const intro: IntroCardProps | null = hasAnyData
    ? {
        username: data.user.login,
        year: new Date().getFullYear()
      }
    : null;

  return {
    username: data.user.login,
    [CardTypes.UNWRAPPED_INTRO]: intro,
    ...nonIntroCardData
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
    | OSSContribsData
    | DependantsData
    | null
  > &
    Username;
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
