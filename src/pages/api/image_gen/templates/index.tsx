import React, { FC } from 'react';
import { CardTypes } from '../../types/cards';
import { IntroCard, IntroCardProps } from './IntroCard';
import { TimeOfTheDay, TimeOfTheDayData } from './TimeOfTheDay';
import {
  Guardian,
  GuardianData
} from '@/pages/api/image_gen/templates/Guardian';
import {
  AuthoredReviewed,
  AuthoredReviewedData
} from '@/pages/api/image_gen/templates/AuthoredReviewed';
import { Dependants, DependantsData } from './Dependants';

export const CardTemplate: FC<{
  cardType: CardTypes;
  data?:
    | IntroCardProps
    | TimeOfTheDayData
    | GuardianData
    | AuthoredReviewedData
    | DependantsData
    | null;
}> = ({ cardType, data }) => {
  switch (cardType) {
    case CardTypes.UNWRAPPED_INTRO:
      return <IntroCard {...(data as IntroCardProps)} />;
    case CardTypes.GUARDIAN_OF_PROD:
      return <Guardian {...(data as GuardianData)} />;
    case CardTypes.PR_REVIEWED_VS_AUTHORED:
      return <AuthoredReviewed {...(data as AuthoredReviewedData)} />;
    case CardTypes.IT_TAKES_A_VILLAGE:
      return <Dependants {...(data as DependantsData)} />;
    default:
      return <TimeOfTheDay {...(data as TimeOfTheDayData)} />;
  }
};
