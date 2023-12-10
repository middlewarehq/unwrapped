import React, { FC } from 'react';
import { RootCard } from './RootCard';
import { websiteUrl } from '../../constants/general';
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

  const niteOwl = `${websiteUrl}/assets/images/niteowl.png`;
  const dayHawk = `${websiteUrl}/assets/images/dayhawk.png`;
  const allDay = `${websiteUrl}/assets/images/allday.png`;

  if (isRoundTheClock) {
    return (
      <RootCard bgColor="orange">
        <div tw="flex flex-col p-1 relative w-full h-full">
          <div tw="flex text-2xl leading-[8px] font-semibold flex-col">
            <p>I code the way</p>
            <p tw="m-0">I breathe. All day!</p>
          </div>
          <div tw="flex flex-col text-4xl mt-8 text-black">
            <h1 tw="m-0">All Day</h1>
            <h1 tw="m-0">Coder</h1>
          </div>
          <div tw=" flex text-xl leading-[16px] flex-col mt-6">
            <p tw="m-0">I pretend to listen</p>
            <p>to you while</p>
            <p tw="m-0">I debug my code</p>
            <p>in my head!</p>
          </div>
        </div>
        <img
          tw="absolute bottom-[-20px] right-[-20px]"
          width={220}
          src={allDay}
          alt=""
        />
      </RootCard>
    );
  } else if (isDayHawk) {
    return (
      <RootCard bgColor="pink">
        <div tw="flex flex-col p-1">
          <div tw="flex text-2xl leading-[8px] font-semibold flex-col">
            <p>I rise with</p>
            <p tw="m-0">the sun!</p>
          </div>
          <div tw="flex flex-col text-4xl mt-8 text-black">
            <h1 tw="m-0">Day</h1>
            <h1 tw="m-0">Hawk</h1>
          </div>
          <div tw="flex text-xl leading-[16px] flex-col mt-6">
            <p tw="m-0">&quot;Cock-a-doodle-doo!&quot;</p>
            <p>Gotta be my </p>
            <p tw="m-0">favorite artist</p>
            <p>of all time!</p>
          </div>
        </div>
        <img
          tw="absolute bottom-[-20px] right-[-20px]"
          width={350}
          src={dayHawk}
          alt=""
        />
      </RootCard>
    );
  } else {
    return (
      <RootCard bgColor="purple">
        <div tw="flex flex-col p-1">
          <div tw="flex text-2xl leading-[8px] font-semibold flex-col">
            <p>Wh... what is...</p>
            <p tw="m-0">sleep?</p>
          </div>
          <div tw="flex flex-col text-4xl mt-8 text-black">
            <h1 tw="m-0">Nite</h1>
            <h1 tw="m-0">Owl</h1>
          </div>
          <div tw="flex text-xl leading-[16px] flex-col mt-6">
            <p tw="m-0">When the world</p>
            <p>sleeps...</p>
            <p tw="m-0">You’re shipping</p>
            <p>code!</p>
          </div>
        </div>
        <img
          tw="absolute bottom-[-20px] right-[-20px]"
          width={200}
          src={niteOwl}
          alt=""
        />
      </RootCard>
    );
  }
};
