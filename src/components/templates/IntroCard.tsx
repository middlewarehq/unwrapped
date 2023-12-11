import React, { FC } from 'react';
import { RootCard } from './RootCard';
import { CARD_HEIGHT, CARD_WIDTH, websiteUrl } from '@/constants/general';

export type IntroCardProps = {
  year: number;
  username: string;
};

export const IntroCard: FC<IntroCardProps> = ({ year, username }) => {
  const reflection = `${websiteUrl}/assets/images/reflection.svg`;

  return (
    <RootCard bgColor="midnight" username="" showReflection={false}>
      <img
        src={reflection}
        alt="reflection"
        width={parseInt(CARD_WIDTH)}
        height={parseInt(CARD_HEIGHT)}
        tw="absolute top-[-20px] right-[-50px]"
      />
      <img
        src={reflection}
        alt="reflection"
        width={parseInt(CARD_WIDTH)}
        height={parseInt(CARD_HEIGHT)}
        tw="absolute top-[-50px] right-[80px]"
        style={{ transform: 'rotate(180deg)' }}
      />
      <div tw="flex flex-col w-full h-full p-2 items-center justify-center">
        <p tw="text-white font-bold text-xl">@{username}&apos;s</p>
        <h1 tw="text-8xl mt-2 text-purple-300">{year}</h1>
        <p tw="text-[44.8px] text-white mt-[-20px] mb-10">Unwrapped</p>
        <p tw="text-white">Let&apos;s go!</p>
      </div>
    </RootCard>
  );
};
