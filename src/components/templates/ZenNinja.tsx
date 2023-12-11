import React, { FC } from 'react';
import { RootCard } from '@/components/templates/RootCard';
import { websiteUrl } from '../../constants/general';
import { Username } from '@/components/templates/index';
import { mean, median } from 'ramda';

export type ZenNinjaData = {
  trends: number[];
};

export const ZenNinja: FC<ZenNinjaData & Username> = ({ trends, username }) => {
  const panda = `${websiteUrl}/assets/images/panda.png`;
  const ninja = `${websiteUrl}/assets/images/ninja.png`;

  const isNinja = isSpiky(trends);

  if (isNinja) {
    return (
      <RootCard bgColor="coralPink" username={username}>
        <div tw="flex flex-col p-1 relative w-full h-full">
          <div tw="flex text-2xl leading-[8px] font-semibold flex-col">
            <p>You execute</p>
            <p tw="m-0">and deliver like a</p>
          </div>
          <div tw="flex text-4xl mt-8 text-black items-baseline">
            <h1 tw="m-0 relative top-2">Ninja</h1>
          </div>
          <div tw="flex mt-10 flex-col">
            <LineGraph data={trends} color="#611100" />
            <p tw="m-0 mt-4 text-xs text-[#611100] font-semibold">
              Your contribs graph in 2023. Spiky!
            </p>
          </div>
          <div tw="flex text-xl leading-[16px] flex-col mt-12">
            <p tw="m-0">When you ship,</p>
            <p>you ship entire</p>
            <p tw="m-0">features in one go</p>
          </div>
        </div>
        <img
          tw="absolute bottom-[-20px] right-[-20px]"
          width={200}
          src={ninja}
          alt=""
        />
      </RootCard>
    );
  } else
    return (
      <RootCard bgColor="lightGreen" username={username}>
        <div tw="flex flex-col p-1 relative w-full h-full">
          <div tw="flex text-2xl leading-[8px] font-semibold flex-col">
            <p>Inner peace? That’s cool!</p>
            <p tw="m-0">Inner piece of what?</p>
          </div>
          <div tw="flex text-4xl mt-8 text-black items-baseline">
            <h1 tw="m-0 relative top-2">Zen</h1>
          </div>
          <div tw="flex mt-10 flex-col">
            <LineGraph data={trends} color="#004949" />
            <p tw="m-0 mt-4 text-xs text-[#004949] font-semibold">
              Your contribs graph in 2023. Pretty consistent!
            </p>
          </div>
          <div tw="flex text-xl leading-[16px] flex-col mt-12">
            <p tw="m-0">You deliver...</p>
            <p>consistently,</p>
            <p tw="m-0">and regularly</p>
          </div>
        </div>
        <img
          tw="absolute bottom-[-20px] right-[-20px]"
          width={200}
          src={panda}
          alt=""
        />
      </RootCard>
    );
};

interface LineGraphProps {
  data: number[];
  color: string;
}

const LineGraph: React.FC<LineGraphProps> = ({ data, color }) => {
  const height = 80;
  const minY = 0;
  const maxY = Math.max(...data);

  const getYCoordinate = (value: number) =>
    ((value - minY) / (maxY - minY)) * height;

  const getPathData = () => {
    return data.map(
      (value, index) =>
        `${(index * 1000) / data.length}, ${height - getYCoordinate(value)}`
    );
  };

  return (
    <div tw="w-full flex h-10">
      {/* @ts-ignore */}
      <svg tw="w-full h-full" viewBox="-10 -10 940 100">
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={getPathData().join(' ')}
        />
      </svg>
    </div>
  );
};

export default LineGraph;

function isSpiky(data: number[]): boolean {
  const avg = mean(data);
  const med = median(data);
  const hi = Math.max(...data);
  const lo = Math.min(...data);
  const diff = Math.abs(med - avg);
  const range = hi - lo;
  const perc = (diff * 100) / range;
  return perc > 20;
}
