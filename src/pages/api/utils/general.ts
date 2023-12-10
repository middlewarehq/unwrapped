import { IntroCardProps } from '../image_gen/templates/IntroCard';
import { TimeOfTheDayData } from '../image_gen/templates/TimeOfTheDay';
import { GithubData } from '../types/ApiResponses';
import { CardTypes } from '../types/cards';

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
