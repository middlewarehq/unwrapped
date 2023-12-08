import React, { FC } from 'react';
import { RootCard } from './RootCard';
const TIME_OF_DAY_THRESHOLD = 0.4;

export type TimeOfTheDayData = {
  prsDuringDay: number;
  totalPrs: number;
};

export const TimeOfTheDay: FC<TimeOfTheDayData> = ({
  prsDuringDay,
  totalPrs
}) => {
  const prsDuringNight = totalPrs - prsDuringDay;
  const isNightOwl = prsDuringNight / totalPrs >= TIME_OF_DAY_THRESHOLD;
  const isDayHawk = prsDuringDay / totalPrs >= TIME_OF_DAY_THRESHOLD;
  const isRoundTheClock = isNightOwl && isDayHawk;

  if (isRoundTheClock) {
    return (
      <RootCard bg={'assets/images/indigo_bg.png'}>
        <div tw="flex flex-col p-1">
          <p tw="text-xl">I code the way</p>
          <p tw="text-xl mt-[-10px]">I breath. All day!</p>
          <h1 tw="text-7xl">All Day</h1>
          <h1 tw="mt-[-20px]  text-7xl">Coder</h1>
          <div tw="flex flex-col">
            <p tw="text-xl">I pretend to listen</p>
            <p tw="text-xl mt-[-6px]">to you while</p>
            <p tw="text-xl mt-[-6px]">I debug my code</p>
            <p tw="text-xl mt-[-6px]">in my head</p>
          </div>
        </div>
      </RootCard>
    );
  } else if (isDayHawk) {
    return (
      <RootCard bg={'assets/images/orange_bg.png'}>
        <div tw="flex flex-col p-1">
          <p tw="text-xl">I rise with</p>
          <p tw="text-xl mt-[-10px]">the sun!</p>
          <h1 tw="text-7xl">Day</h1>
          <h1 tw="mt-[-20px]  text-7xl">Hawk</h1>
          <div tw="flex flex-col">
            <p tw="text-xl">&quot;Cock-a-doodle-doo!&quot;</p>
            <p tw="text-xl mt-[-6px]">Gotta be my </p>
            <p tw="text-xl mt-[-6px]">favorite artist</p>
            <p tw="text-xl mt-[-6px]">of all time!</p>
          </div>
        </div>
      </RootCard>
    );
  } else {
    return (
      <RootCard bg={'assets/images/purple_bg.png'}>
        <div tw="flex flex-col p-1">
          <p tw="text-xl">Wh... what is...</p>
          <p tw="text-xl mt-[-10px]">sleep?</p>
          <h1 tw="text-7xl">Nite</h1>
          <h1 tw="mt-[-20px]  text-7xl">Owl</h1>
          <div tw="flex flex-col">
            <p tw="text-xl">When the world</p>
            <p tw="text-xl mt-[-6px]">sleeps...</p>
            <p tw="text-xl mt-[-6px]">You’re shipping</p>
            <p tw="text-xl mt-[-6px]">code.</p>
          </div>
        </div>
      </RootCard>
    );
  }
};
