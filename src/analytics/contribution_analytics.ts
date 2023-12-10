import { GithubContributionCalendar } from '@/exapi_sdk/types';

export const getContributionDaysList = (
  contributionCalendar: GithubContributionCalendar
) => {
  return contributionCalendar.weeks
    .map((weekData) => weekData.contributionDays)
    .flat();
};
