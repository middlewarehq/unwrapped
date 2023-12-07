export enum CardTypes {
  UNWRAPPED_INTRO = 'UNWRAPPED_INTRO',
  YOUR_CONTRIBUTIONS = 'YOUR_CONTRIBUTIONS',
  CONTRIBUTION_STREAK = 'CONTRIBUTION_STREAK',
  NINJA_OR_ZEN = 'NINJA_OR_ZEN',
  DAY_NIGHT_CYCLE = 'DAY_NIGHT_CYCLE',
  IT_TAKES_A_VILLAGE = 'IT_TAKES_A_VILLAGE',
  GUARDIAN_OF_PROD = 'GUARDIAN_OF_PROD',
  TOP_REVIEWERS = 'TOP_REVIEWERS',
  PR_TIME_LAGS = 'PR_TIME_LAGS',
  PR_REVIEWED_VS_AUTHORED = 'PR_REVIEWED_VS_AUTHORED',
  PRODUCTION_BREAKING = 'PRODUCTION_BREAKING',
  OSS_CONTRIBUTION = 'OSS_CONTRIBUTION'
}

export const sequence = [
  CardTypes.UNWRAPPED_INTRO,
  CardTypes.YOUR_CONTRIBUTIONS,
  CardTypes.CONTRIBUTION_STREAK,
  CardTypes.DAY_NIGHT_CYCLE,
  CardTypes.NINJA_OR_ZEN,
  CardTypes.IT_TAKES_A_VILLAGE,
  CardTypes.GUARDIAN_OF_PROD,
  CardTypes.TOP_REVIEWERS,
  CardTypes.PR_TIME_LAGS,
  CardTypes.PR_REVIEWED_VS_AUTHORED,
  CardTypes.PRODUCTION_BREAKING,
  CardTypes.OSS_CONTRIBUTION
];
