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
    [CardTypes.NINJA_OR_ZEN]: null,
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
  [CardTypes.NINJA_OR_ZEN]: '',
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

export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (value: number): string => {
    const hex = value.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  const hexR = toHex(r);
  const hexG = toHex(g);
  const hexB = toHex(b);

  return `#${hexR}${hexG}${hexB}`;
}

export function darkenHexColor(hex: string, factor: number): string {
  // Remove the '#' from the beginning of the hex code (if present)
  const cleanHex = hex.replace(/^#/, '');

  // Parse the hex values into RGB
  const bigint = parseInt(cleanHex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  // Apply darkness factor to each RGB component
  const darkenedR = Math.max(0, Math.round(r * (1 - factor)));
  const darkenedG = Math.max(0, Math.round(g * (1 - factor)));
  const darkenedB = Math.max(0, Math.round(b * (1 - factor)));

  // Convert the darkened RGB values back to hex
  const darkenedHex = ((darkenedR << 16) + (darkenedG << 8) + darkenedB)
    .toString(16)
    .padStart(6, '0');

  // Return the darkened hex color with the '#' prefix
  return `#${darkenedHex}`;
}
