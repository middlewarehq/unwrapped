import React, { FC } from 'react';
import { RootCard } from '@/components/templates/RootCard';
import { websiteUrl } from '../../constants/general';
import { Username } from '@/components/templates/index';

export type GuardianData = {
  numberOfTimes: number;
};

export const Guardian: FC<GuardianData & Username> = ({
  numberOfTimes,
  username
}) => {
  const groot = `${websiteUrl}/assets/images/groot.png`;
  return (
    <RootCard bgColor="teal" username={username}>
      <div tw="flex flex-col p-1 relative w-full h-full">
        <div tw="flex text-2xl leading-[8px] font-semibold flex-col">
          <p>Guardian of the</p>
          <p tw="m-0">Repository!</p>
        </div>
        <div tw="flex text-4xl mt-8 text-black items-baseline">
          <h1 tw="m-0 relative top-2">{numberOfTimes}</h1>
          <span tw="ml-2.5 relative text-2xl">times</span>
        </div>
        <div tw="flex text-xl leading-[16px] flex-col mt-12">
          <p tw="m-0">You’ve stopped</p>
          <p>bad code from</p>
          <p tw="m-0">ending up in</p>
          <p>production</p>
        </div>
      </div>
      <img
        tw="absolute bottom-[-20px] right-[-20px]"
        width={200}
        src={groot}
        alt=""
      />
    </RootCard>
  );
};
