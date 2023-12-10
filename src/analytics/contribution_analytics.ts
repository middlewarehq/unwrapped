import {
  ContributionDay,
  GithubContributionCalendar,
  GraphQLRepositoryContributionData
} from '@/exapi_sdk/types';
import { getMonth, parseISO } from 'date-fns';

export const getContributionDaysList = (
  contributionCalendar: GithubContributionCalendar
) => {
  return contributionCalendar.weeks
    .map((weekData) => weekData.contributionDays)
    .flat();
};

export const getMonthWiseContributionCount = (
  contributionCalendar?: GithubContributionCalendar
) => {
  let monthNumberToContributionsCountMap: any = {};
  for (let i = 0; i < 12; i++) monthNumberToContributionsCountMap[i] = 0;

  if (!contributionCalendar) {
    return monthNumberToContributionsCountMap;
  }

  const contributions: ContributionDay[] =
    getContributionDaysList(contributionCalendar);

  for (let contribution of contributions) {
    let monthNumber = getMonth(parseISO(contribution.date));
    monthNumberToContributionsCountMap[monthNumber] +=
      contribution.contributionCount;
  }

  return monthNumberToContributionsCountMap;
};

export const getLongestContributionStreak = (
  contributionCalendar?: GithubContributionCalendar
): number => {
  if (!contributionCalendar) return 0;

  const contributions: ContributionDay[] =
    getContributionDaysList(contributionCalendar);

  let currentContributionStreakLength = 0;
  let maxContributionStreakLength = 0;

  for (let contribution of contributions) {
    if (!contribution.contributionCount) {
      maxContributionStreakLength = Math.max(
        currentContributionStreakLength,
        maxContributionStreakLength
      );
      currentContributionStreakLength = 0;
      continue;
    }

    currentContributionStreakLength += 1;
  }

  maxContributionStreakLength = Math.max(
    currentContributionStreakLength,
    maxContributionStreakLength
  );

  return maxContributionStreakLength;
};

export const getRepoWiseOpensourceContributionsCount = (
  repoContributionData: GraphQLRepositoryContributionData,
  author: string
): Record<string, number> => {
  const flattenedRepoContributionsList = Object.values(
    repoContributionData.data.user.contributionsCollection
  ).flat();

  const publicRepoContributions = flattenedRepoContributionsList.filter(
    (repoData) => !repoData.repository.isPrivate
  );

  const opensourceRepoContributions = publicRepoContributions.filter(
    (repoData) => repoData.repository.owner.login !== author
  );

  let repoNameToContributionCountMap: Record<string, number> = {};

  for (let repoContributionData of opensourceRepoContributions) {
    const completeRepoName = `${repoContributionData.repository.owner.login}/${repoContributionData.repository.name}`;
    if (completeRepoName in repoNameToContributionCountMap) {
      repoNameToContributionCountMap[completeRepoName] +=
        repoContributionData.contributions.totalCount;
    } else {
      repoNameToContributionCountMap[completeRepoName] =
        repoContributionData.contributions.totalCount;
    }
  }

  return repoNameToContributionCountMap;
};
