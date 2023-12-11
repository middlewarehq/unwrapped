import React, { FC } from 'react';
import { RootCard } from './RootCard';

export type IntroCardProps = {
  year: number;
  username: string;
};

export const IntroCard: FC<IntroCardProps> = ({ year, username }) => {
  return (
    <RootCard bgColor="red" username="">
      <div tw="text-black flex flex-col w-full h-full p-2 items-center justify-center">
        <p>@{username}</p>
        <h1 tw="text-5xl mt-10">{year}</h1>
        <p tw="text-5xl mt-[-20px] mb-10">Unwrapped</p>
        <p>Let&apos;s go!</p>
      </div>
    </RootCard>
  );
};
