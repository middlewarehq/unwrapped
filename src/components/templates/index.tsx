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

export type CardTemplateData = {
  cardType: CardTypes;
  data?:
    | IntroCardProps
    | TimeOfTheDayData
    | GuardianData
    | AuthoredReviewedData
    | DependantsData
    | ContributionsData
    | ZenNinjaData
    | StreakData
    | CodeReviewsData
    | null;
};

export const CardTemplate: FC<CardTemplateData> = ({ cardType, data }) => {
  switch (cardType) {
    case CardTypes.UNWRAPPED_INTRO:
      return <IntroCard {...(data as IntroCardProps)} />;
    case CardTypes.GUARDIAN_OF_PROD:
      return <Guardian {...(data as GuardianData)} />;
    case CardTypes.PR_REVIEWED_VS_AUTHORED:
      return <AuthoredReviewed {...(data as AuthoredReviewedData)} />;
    case CardTypes.IT_TAKES_A_VILLAGE:
      return <Dependants {...(data as DependantsData)} />;
    case CardTypes.YOUR_CONTRIBUTIONS:
      return <Contributions {...(data as ContributionsData)} />;
    case CardTypes.ZEN_OR_NINJA:
      return <ZenNinja {...(data as ZenNinjaData)} />;
    case CardTypes.OSS_CONTRIBUTION:
      return <OSSContribs {...(data as OSSContribsData)} />;
    case CardTypes.CONTRIBUTION_STREAK:
      return <Streak {...(data as StreakData)} />;
    case CardTypes.TOP_REVIEWERS:
      return <CodeReviews {...(data as CodeReviewsData)} />;
    default:
      return <TimeOfTheDay {...(data as TimeOfTheDayData)} />;
  }
};