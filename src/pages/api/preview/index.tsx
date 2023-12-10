import React from 'react';
import { IntroCard } from '../../../components/templates/IntroCard';
import { TimeOfTheDay } from '../../../components/templates/TimeOfTheDay';

const AllCards = () => {
  return (
    <div tw="flex flex-wrap gap-2">
      <IntroCard username="@eshaan" year={2023} />
      <TimeOfTheDay prsDuringDay={234} totalPrs={432} />
    </div>
  );
};

export default AllCards;
