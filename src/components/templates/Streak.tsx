import React, { FC } from 'react';
import { RootCard } from '@/components/templates/RootCard';
import { websiteUrl } from '../../constants/general';

export type StreakData = {
  streak: number;
};

export const Streak: FC<StreakData> = ({ streak }) => {
  const office = `${websiteUrl}/assets/images/office.png`;
  return (
    <RootCard bgColor="indigo">
      <div tw="flex flex-col p-1 relative w-full h-full">
        <div tw="flex text-2xl leading-[8px] font-semibold flex-col">
          <p>“Take a break, you’ll get sick!”</p>
          <p tw="m-0">“Y’know what? I’m gonna</p>
          <p>code even harder!”</p>
        </div>
        <div tw="flex text-4xl mt-8 text-black items-baseline">
          <h1 tw="m-0 relative top-2">{streak}</h1>
          <span tw="ml-2.5 relative text-2xl">days</span>
        </div>
        <div tw="flex text-xl leading-[16px] flex-col mt-12">
          <p tw="m-0">Continuously.</p>
          <p>You’ve shipped code.</p>
          <p tw="m-0">Every.</p>
          <p>Single.</p>
          <p tw="m-0">Day.</p>
        </div>
      </div>
      <img
        tw="absolute bottom-[-20px] right-[-20px]"
        width={250}
        src={office}
        alt=""
      />
    </RootCard>
  );
};
