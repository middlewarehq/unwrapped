import React, { FC } from 'react';
import { RootCard } from '@/components/templates/RootCard';
import { websiteUrl } from '../../constants/general';
import { Username } from '@/components/templates/index';

export type GuardianData = {
  numberOfTimes: number;
};

export const Leader: FC<Username> = ({ username }) => {
  const drStrange = `${websiteUrl}/assets/images/dr-strange.png`;
  return (
    <RootCard bgColor="coralPink" username={username} decoType="confetti">
      <div tw="flex flex-col p-1 relative w-full h-full">
        <div tw="flex flex-col text-4xl mt-6 text-black items-baseline">
          <div tw="flex text-2xl leading-[8px] font-semibold flex-col">
            <p>Mission 2024</p>
          </div>
          <h1 tw="m-0 relative top-2">Leader</h1>
        </div>
        <div tw="flex text-xl leading-[16px] flex-col mt-12">
          <p tw="m-0">Guide the way in</p>
          <p>reclaiming control</p>
          <p tw="m-0">of time for the</p>
          <p>makers</p>
        </div>
      </div>
      <img
        tw="absolute bottom-[-20px] right-[-20px]"
        width={250}
        src={drStrange}
        alt=""
      />
    </RootCard>
  );
};
