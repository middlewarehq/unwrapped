import React from 'react';
import { IntroCard } from '../../../components/templates/IntroCard';

const AllCards = () => {
  return (
    <div tw="flex flex-wrap gap-2">
      <IntroCard username="@eshaan" year={2023} />
    </div>
  );
};

export default AllCards;
