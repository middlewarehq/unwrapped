import { ContributionDay, GithubContributionCalendar } from '@/exapi_sdk/types';
import { getMonth, parseISO } from 'date-fns';

export const getContributionDaysList = (
  contributionCalendar: GithubContributionCalendar
) => {
  return contributionCalendar.weeks
    .map((weekData) => weekData.contributionDays)
    .flat();
};

export const getMonthWiseContributionCount = (
  contributionCalendar: GithubContributionCalendar
) => {
  const contributions: ContributionDay[] =
    getContributionDaysList(contributionCalendar);
  let monthNumberToContributionsCountMap: any = {};

  for (let i = 0; i < 12; i++) monthNumberToContributionsCountMap[i] = 0;

  for (let contribution of contributions) {
    let monthNumber = getMonth(parseISO(contribution.date));
    monthNumberToContributionsCountMap[monthNumber] +=
      contribution.contributionCount;
  }

  return monthNumberToContributionsCountMap;
};
