import React, { FC } from 'react';
import { RootCard } from '@/components/templates/RootCard';
import { websiteUrl } from '../../constants/general';
import { Username } from '@/components/templates/index';

export type GuardianData = {
  numberOfTimes: number;
};

export const Pioneer: FC<Username> = ({ username }) => {
  const tonyStark = `${websiteUrl}/assets/images/tony-stark.png`;
  return (
    <RootCard bgColor="teal" username={username} decoType="confetti">
      <div tw="flex flex-col p-1 relative w-full h-full">
        <div tw="flex flex-col text-4xl mt-6 text-black items-baseline">
          <div tw="flex text-2xl leading-[8px] font-semibold flex-col">
            <p>Mission 2024</p>
          </div>
          <h1 tw="m-0 relative top-2">Pioneer</h1>
        </div>
        <div tw="flex text-xl leading-[16px] flex-col mt-12">
          <p tw="m-0">Lead the charge</p>
          <p>at the bleeding edge</p>
          <p tw="m-0">of the development</p>
          <p>universe</p>
        </div>
      </div>
      <img
        tw="absolute bottom-[-20px] right-[-60px]"
        width={400}
        src={tonyStark}
        alt=""
      />
    </RootCard>
  );
};
