import { AuthoredReviewedData } from '../image_gen/templates/AuthoredReviewed';
import { ContributionsData } from '../image_gen/templates/Contributions';
import { GuardianData } from '../image_gen/templates/Guardian';
import { IntroCardProps } from '../image_gen/templates/IntroCard';
import { GitHubDataResponse } from '../types/ApiResponses';
import { TimeOfTheDayData } from '@/pages/api/image_gen/templates/TimeOfTheDay';

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
    intro,
    guardian,
    contributions,
    authoredVsReviewedPRs,
    timeBasedData
  };
};
