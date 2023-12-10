import { websiteUrl } from '../constants/general';
import { IntroCardProps } from '../image_gen/templates/IntroCard';
import { TimeOfTheDayData } from '../image_gen/templates/TimeOfTheDay';
import { GitHubDataResponse, GithubData } from '../types/ApiResponses';
import { CardTypes } from '../types/cards';
import { getDataFromGithubResponse } from './adaptor';

export function arrayBufferToBuffer(arrayBuffer: ArrayBuffer): Buffer {
  const uint8Array = new Uint8Array(arrayBuffer);
  const nodeBuffer = Buffer.from(uint8Array);
  return nodeBuffer;
}

export const cardTemplateAdaptor = (data: GithubData) => {
  let result: Record<
    keyof typeof CardTypes,
    IntroCardProps | TimeOfTheDayData | null
  >;
  result = {
    [CardTypes.UNWRAPPED_INTRO]: {
      username: data.data.username,
      year: data.data.year
    },
    [CardTypes.DAY_NIGHT_CYCLE]: {
      prsDuringDay: data.data.commits_during_day,
      totalPrs: data.data.total_commits
    },
    [CardTypes.YOUR_CONTRIBUTIONS]: null,
    [CardTypes.CONTRIBUTION_STREAK]: null,
    [CardTypes.ZEN_OR_NINJA]: null,
    [CardTypes.IT_TAKES_A_VILLAGE]: null,
    [CardTypes.GUARDIAN_OF_PROD]: null,
    [CardTypes.TOP_REVIEWERS]: null,
    [CardTypes.PR_TIME_LAGS]: null,
    [CardTypes.PR_REVIEWED_VS_AUTHORED]: null,
    [CardTypes.PRODUCTION_BREAKING]: null,
    [CardTypes.OSS_CONTRIBUTION]: null
  };

  return result;
};

export const abbreviateNumber = (value: number): string => {
  const suffixes = ['', 'k', 'M', 'B', 'T'];
  const order = Math.floor(Math.log10(value) / 3);

  if (order < suffixes.length) {
    const roundedValue = Math.round(value / Math.pow(10, order * 3));
    return `${roundedValue}${suffixes[order]}`;
  } else {
    return value.toString();
  }
};

export type ParamsObject = { [key: string]: number | string };

export function generateParamUrl(
  baseURL: string,
  params: ParamsObject
): string {
  const paramString = Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join('&');

  return `${baseURL}?${paramString}`;
}

const urlMap: Record<CardTypes, string> = {
  [CardTypes.UNWRAPPED_INTRO]: `${websiteUrl}/api/card_image/intro`,
  [CardTypes.DAY_NIGHT_CYCLE]: `${websiteUrl}/api/card_image/timebased`,
  [CardTypes.YOUR_CONTRIBUTIONS]: `${websiteUrl}/api/card_image/contributions`,
  [CardTypes.PR_REVIEWED_VS_AUTHORED]: `${websiteUrl}/api/card_image/authoredReviewed`,
  [CardTypes.GUARDIAN_OF_PROD]: `${websiteUrl}/api/card_image/guardian`,
  // rest are null
  [CardTypes.CONTRIBUTION_STREAK]: '',
  [CardTypes.ZEN_OR_NINJA]: '',
  [CardTypes.IT_TAKES_A_VILLAGE]: '',
  [CardTypes.TOP_REVIEWERS]: '',
  [CardTypes.PR_TIME_LAGS]: '',
  [CardTypes.PRODUCTION_BREAKING]: '',
  [CardTypes.OSS_CONTRIBUTION]: ''
};

export const getCardLinksFromGithubData = (
  data: GitHubDataResponse
): string[] => {
  const adaptedData = getDataFromGithubResponse(data);

  const cardLinks = Object.entries(adaptedData).map(([cardName, cardData]) => {
    const cardUrl = urlMap[cardName as CardTypes];
    const params = cardData as ParamsObject;
    const cardLink = generateParamUrl(cardUrl, params);
    return cardLink;
  });

  return cardLinks;
};
