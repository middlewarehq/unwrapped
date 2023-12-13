import {
  ContributionDay,
  GithubContributionCalendar,
  GraphQLRepositoryContributionData,
  RepositoryContributionData
} from '@/api-helpers/exapi-sdk/types';
import { getMonth, parseISO } from 'date-fns';
import { clone, sum } from 'ramda';

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

export const getWeekWiseContributionCount = (
  contributionCalendar?: GithubContributionCalendar
) => {
  return (
    contributionCalendar?.weeks.map((w) =>
      sum(w.contributionDays.map((d) => d.contributionCount))
    ) || []
  );
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
): Array<RepositoryContributionData> => {
  const collection = repoContributionData.data.user.contributionsCollection;

  if (!collection) return [];

  const flattenedRepoContributionsList = Object.values(collection).flat();

  const publicRepoContributions = flattenedRepoContributionsList.filter(
    (repoData) => !repoData.repository.isPrivate
  );

  const opensourceRepoContributions = publicRepoContributions.filter(
    (repoData) => repoData.repository.owner.login !== author
  );

  let repoNameToFinalContributionData: Record<
    string,
    RepositoryContributionData
  > = {};

  for (let repoContributionData of opensourceRepoContributions) {
    const completeRepoName = `${repoContributionData.repository.owner.login}/${repoContributionData.repository.name}`;
    if (completeRepoName in repoNameToFinalContributionData) {
      repoNameToFinalContributionData[
        completeRepoName
      ].contributions.totalCount +=
        repoContributionData.contributions.totalCount;
    } else {
      repoNameToFinalContributionData[completeRepoName] =
        clone(repoContributionData);
    }
  }

  return Object.values(repoNameToFinalContributionData).sort(
    (repoData1, repoData2) =>
      repoData2.contributions.totalCount - repoData1.contributions.totalCount
  );
};
