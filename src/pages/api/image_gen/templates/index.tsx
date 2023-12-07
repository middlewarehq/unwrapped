import React, { FC } from 'react';
import { CardTypes } from '../../types/cards';
import { IntroCard, IntroCardProps } from './IntroCard';
import { TimeOfTheDay, TimeOfTheDayData } from './TimeOfTheDay';

export const CardTemplate: FC<{
  cardType: CardTypes;
  data?: IntroCardProps | TimeOfTheDayData | null;
}> = ({ cardType, data }) => {
  switch (cardType) {
    case CardTypes.UNWRAPPED_INTRO:
      return <IntroCard {...(data as IntroCardProps)} />;
    default:
      return <TimeOfTheDay {...(data as TimeOfTheDayData)} />;
  }
};
