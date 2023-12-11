import React, { FC } from 'react';
import { RootCard } from '@/components/templates/RootCard';
import { websiteUrl } from '../../constants/general';
import { abbreviateNumber } from '@/api-helpers/general';
import { Username } from '@/components/templates/index';

export type ContributionsData = {
  contributions: number;
  percentile: number | null | undefined;
};

export const Contributions: FC<ContributionsData & Username> = ({
  contributions,
  percentile,
  username
}) => {
  const artemis = `${websiteUrl}/assets/images/artemis.png`;
  return (
    <RootCard bgColor="orange" username={username}>
      <div tw="flex flex-col p-1 relative w-full h-full">
        <div tw="flex text-2xl leading-[8px] font-semibold flex-col">
          <p>Higher than</p>
          <p tw="m-0">Artemis 1</p>
        </div>
        <div tw="flex text-4xl mt-8 text-black items-baseline">
          <h1 tw="m-0 relative top-2">{abbreviateNumber(contributions)}</h1>
          <span tw="ml-2.5 relative text-2xl">contribs</span>
        </div>
        <div tw="flex text-xl leading-[16px] flex-col mt-12">
          <p tw="m-0">Made by you in the</p>
          <p>last year</p>
          <br />
          <br />
          <br />
          {percentile && (
            <div tw="flex-col flex mt-10">
              <p tw="m-0">That puts you in</p>
              <p tw="font-semibold">the top {percentile}%</p>
            </div>
          )}
        </div>
      </div>
      <img
        tw="absolute bottom-[-20px] right-[-20px]"
        width={200}
        src={artemis}
        alt=""
      />
    </RootCard>
  );
};
