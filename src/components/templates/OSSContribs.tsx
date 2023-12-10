import React, { FC } from 'react';
import { RootCard } from '@/components/templates/RootCard';
import { websiteUrl } from '../../constants/general';

export type OSSContribsData = {
  trends: number[];
};

export const OSSContribs: FC<OSSContribsData> = ({ trends }) => {
  const panda = `${websiteUrl}/assets/images/panda.png`;
  const ninja = `${websiteUrl}/assets/images/ninja.png`;

  const isNinja = isErratic(trends);

  if (isNinja) {
    return (
      <RootCard bgColor="coralPink">
        <div tw="flex flex-col p-1 relative w-full h-full">
          <div tw="flex text-2xl leading-[8px] font-semibold flex-col">
            <p>Swoop, slash, ...</p>
            <p tw="m-0">Commit!</p>
          </div>
          <div tw="flex text-4xl mt-8 text-black items-baseline">
            <h1 tw="m-0 relative top-2">Ninja</h1>
          </div>
          <div tw="flex mt-10 flex-col">
            <LineGraph data={trends} color="#611100" />
            <p tw="m-0 mt-4 text-xs text-[#611100] font-semibold">
              Your contribs graph in 2023
            </p>
          </div>
          <div tw="flex text-xl leading-[16px] flex-col mt-12">
            <p tw="m-0">You lurk in the</p>
            <p>shadows, but you</p>
            <p tw="m-0">ship like a shuriken</p>
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
      <RootCard bgColor="lightGreen">
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
              Your contribs graph in 2023
            </p>
          </div>
          <div tw="flex text-xl leading-[16px] flex-col mt-12">
            <p tw="m-0">You’re a master...</p>
            <p>Of productivity,</p>
            <p tw="m-0">and consistency</p>
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

  const minY = Math.min(...data);

  const maxY = Math.max(...data);

  const getYCoordinate = (value: number) =>
    ((value - minY) / (maxY - minY)) * height;

  const getPathData = () => {
    return data.map(
      (value, index) =>
        `${(index * 1000) / 12}, ${height - getYCoordinate(value)}`
    );
  };

  return (
    <div tw="w-full flex h-10">
      {/* @ts-ignore */}
      <svg tw="w-full h-full">
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={getPathData().join(' ')}
        />
      </svg>
    </div>
  );
};

export default LineGraph;

const isErratic = (numbers: number[]): boolean => {
  if (numbers.length < 3) {
    return false;
  }

  const spikeRatioThreshold = 1.5;
  for (let i = 1; i < numbers.length - 1; i++) {
    const prevDiff = Math.abs(numbers[i] - numbers[i - 1]);
    const nextDiff = Math.abs(numbers[i + 1] - numbers[i]);
    const ratio = nextDiff / prevDiff;
    if (ratio > spikeRatioThreshold) {
      return true;
    }
  }

  return false; // No spikes found
};
