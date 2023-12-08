import React from 'react';
import { IntroCard } from '../image_gen/templates/IntroCard';
import { TimeOfTheDay } from '../image_gen/templates/TimeOfTheDay';

const AllCards = () => {
  return (
    <div tw="flex flex-wrap gap-2">
      <IntroCard username="@eshaan" year={2023} />
      <TimeOfTheDay prsDuringDay={234} totalPrs={432} />
    </div>
  );
};

export default AllCards;
