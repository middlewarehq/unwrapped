import React, { FC } from 'react';
import { RootCard } from './RootCard';
import { websiteUrl } from '../../constants/general';
import { Username } from '@/components/templates/index';
const TIME_OF_DAY_THRESHOLD = 0.4;

export type TimeOfTheDayData = {
  prsDuringDay: number;
  totalPrs: number;
  productiveDay: string;
  productiveHour: number;
};

export const TimeOfTheDay: FC<TimeOfTheDayData & Username> = ({
  prsDuringDay,
  totalPrs,
  username,
  productiveDay,
  productiveHour
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
      <RootCard bgColor="orange" username={username} decoType="fireworks">
        <div tw="flex flex-col p-1">
          <CardSubtitle text="I code when I breathe..." />
          <CardTitle text="All Day~Coder" />
          <CardSubText text="You deliver throughout the day" />
          <ProductiveTimes
            productiveHour={productiveHour}
            productiveDay={productiveDay}
          />
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
      <RootCard bgColor="pink" username={username} decoType="confetti">
        <div tw="flex flex-col p-1">
          <CardSubtitle text="They say I catch the what?" />
          <CardTitle text="Early~Bird" />
          <CardSubText text="You prefer a 9-5 job" />
          <ProductiveTimes
            productiveHour={productiveHour}
            productiveDay={productiveDay}
          />
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
      <RootCard bgColor="purple" username={username} decoType="stars">
        <div tw="flex flex-col p-1">
          <CardSubtitle text="Wh... what is... sleep?" />
          <CardTitle text="Night~Owl" />
          <CardSubText text="Other sleep, you ship" />
          <ProductiveTimes
            productiveHour={productiveHour}
            productiveDay={productiveDay}
          />
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

const CardSubtitle = ({ text }: { text: string }) => {
  return (
    <div tw="flex text-2xl leading-[8px] font-semibold flex-col">
      <p>{text}</p>
    </div>
  );
};

const CardTitle = ({ text }: { text: string }) => {
  const splitText = text.split('~');
  return (
    <div tw="flex flex-col text-[40px] mt-3 text-black">
      <h1 tw="m-0">{splitText[0]}</h1>
      <h1 tw="-mt-5">{splitText[1]}</h1>
    </div>
  );
};

const CardSubText = ({ text }: { text: string }) => {
  return (
    <div tw="flex text-xl leading-[16px] flex-col -mt-4">
      <p tw="m-0">{text}</p>
    </div>
  );
};

const ProductiveTimes = ({
  productiveDay,
  productiveHour
}: {
  productiveDay: string;
  productiveHour: number;
}) => {
  return (
    <div tw="flex flex-col font-bold mt-10">
      {productiveHour !== -1 ? <p tw="mt-0">Most Active Hour</p> : null}
      {productiveHour !== -1 ? (
        <p tw="-mt-4 text-2xl">{getAmPm(productiveHour)}</p>
      ) : null}
      <p tw="mt-0">Most Active Day</p>
      <p tw="-mt-4 text-2xl capitalize">{productiveDay}</p>
    </div>
  );
};

const getAmPm = (hour: number): string => {
  if (hour === 0 || hour === 24) return '12am';
  if (hour === 12) return '12pm';
  if (hour >= 12) {
    return (hour % 12) + 'pm';
  } else {
    return (hour % 12) + 'am';
  }
};
