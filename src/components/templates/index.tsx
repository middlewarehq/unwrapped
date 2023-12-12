import React, { FC } from 'react';
import { CardTypes } from '../../types/cards';
import { IntroCard, IntroCardProps } from './IntroCard';
import { TimeOfTheDay, TimeOfTheDayData } from './TimeOfTheDay';
import { Guardian, GuardianData } from '@/components/templates/Guardian';
import {
  AuthoredReviewed,
  AuthoredReviewedData
} from '@/components/templates/AuthoredReviewed';
import { Dependants, DependantsData } from './Dependants';
import {
  Contributions,
  ContributionsData
} from '@/components/templates/Contributions';
import { ZenNinja, ZenNinjaData } from '@/components/templates/ZenNinja';
import { Streak, StreakData } from '@/components/templates/Streak';
import { CodeReviews, CodeReviewsData } from './CodeReviews';
import { OSSContribs, OSSContribsData } from './OSSContribs';
import { Pioneer } from './Pioneer';
import { Leader } from './Leader';

export type Username = { username: string };

export type CardTemplateData = {
  cardType: CardTypes;
  data?:
    | ((
        | IntroCardProps
        | TimeOfTheDayData
        | GuardianData
        | AuthoredReviewedData
        | DependantsData
        | ContributionsData
        | ZenNinjaData
        | StreakData
        | CodeReviewsData
        | OSSContribsData
      ) &
        Username)
    | Username
    | null;
};

export const CardTemplate: FC<CardTemplateData> = ({ cardType, data }) => {
  switch (cardType) {
    case CardTypes.UNWRAPPED_INTRO:
      return <IntroCard {...(data as Username & IntroCardProps)} />;
    case CardTypes.GUARDIAN_OF_PROD:
      return <Guardian {...(data as Username & GuardianData)} />;
    case CardTypes.PR_REVIEWED_VS_AUTHORED:
      return (
        <AuthoredReviewed {...(data as Username & AuthoredReviewedData)} />
      );
    case CardTypes.IT_TAKES_A_VILLAGE:
      return <Dependants {...(data as Username & DependantsData)} />;
    case CardTypes.YOUR_CONTRIBUTIONS:
      return <Contributions {...(data as Username & ContributionsData)} />;
    case CardTypes.ZEN_OR_NINJA:
      return <ZenNinja {...(data as Username & ZenNinjaData)} />;
    case CardTypes.OSS_CONTRIBUTION:
      return <OSSContribs {...(data as Username & OSSContribsData)} />;
    case CardTypes.CONTRIBUTION_STREAK:
      return <Streak {...(data as Username & StreakData)} />;
    case CardTypes.TOP_REVIEWERS:
      return <CodeReviews {...(data as Username & CodeReviewsData)} />;
    case CardTypes.PIONEER:
      return <Pioneer {...(data as Username)} />;
    case CardTypes.LEADER:
      return <Leader {...(data as Username)} />;
    default:
      return <TimeOfTheDay {...(data as Username & TimeOfTheDayData)} />;
  }
};
