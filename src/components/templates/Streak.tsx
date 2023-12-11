import React, { FC } from 'react';
import { RootCard } from '@/components/templates/RootCard';
import { websiteUrl } from '../../constants/general';
import { Username } from '@/components/templates/index';

export type StreakData = {
  streak: number;
};

export const Streak: FC<StreakData & Username> = ({ streak, username }) => {
  const office = `${websiteUrl}/assets/images/delorean.png`;
  return (
    <RootCard bgColor="green" username={username}>
      <div tw="flex flex-col p-1 relative w-full h-full">
        <div tw="flex font-semibold flex-col">
          <p tw="text-xl leading-[16px] mb-6">Breaks?</p>
          <p tw="m-0 text-2xl leading-[12px]">Where we&apos;re going</p>
          <p tw="text-2xl leading-[12px]">we don&apos;t need breaks</p>
        </div>
        <div tw="flex text-4xl mt-2 text-black items-baseline">
          <h1 tw="m-0 relative top-2">{streak}</h1>
          <span tw="ml-2.5 relative text-2xl">days</span>
        </div>
        <div tw="flex text-xl leading-[16px] flex-col mt-10">
          <p tw="m-0">Continuously.</p>
          <p>You’ve shipped code.</p>
          <p tw="m-0">Every.</p>
          <p>Single.</p>
          <p tw="m-0">Day.</p>
        </div>
      </div>
      <img
        tw="absolute bottom-[-20px] right-[-20px]"
        width={350}
        src={office}
        alt=""
      />
    </RootCard>
  );
};
