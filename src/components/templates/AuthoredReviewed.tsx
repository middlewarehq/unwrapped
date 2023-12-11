import React, { FC } from 'react';
import { RootCard } from './RootCard';
import { websiteUrl } from '../../constants/general';

export type AuthoredReviewedData = {
  reviewedPrs: number;
  authoredPrs: number;
};

const colors = { reviewed: '#D25C55', authored: '#9A1F17' };

export const AuthoredReviewed: FC<AuthoredReviewedData> = ({
  authoredPrs,
  reviewedPrs
}) => {
  const joey = `${websiteUrl}/assets/images/joey.png`;
  return (
    <RootCard bgColor="red">
      <div tw="flex flex-col p-1 relative w-full h-full">
        <div tw="flex text-2xl leading-[8px] font-semibold flex-col">
          <p>Shipping code is</p>
          <p tw="m-0">about having, giving,</p>
          <p>sharing, and receiving</p>
        </div>
        <div tw="flex">
          <PieChart authoredPrs={authoredPrs} reviewedPrs={reviewedPrs} />
        </div>
        <div tw="flex flex-col font-medium">
          <div tw="flex mt-8">
            <div
              tw={`flex w-4 h-4 border-black border bg-[${colors.authored}]`}
            />
            <p tw="m-0 ml-2">Authored PRs ({authoredPrs})</p>
          </div>
          <div tw="flex mt-2">
            <div
              tw={`flex w-4 h-4 border-black border  bg-[${colors.reviewed}]`}
            />
            <p tw="m-0 ml-2">Reviewed PRs ({reviewedPrs})</p>
          </div>
        </div>
        {reviewedPrs < authoredPrs ? (
          <div tw="flex text-xl leading-[8px] flex-col mt-8">
            <p tw="m-0">About PRs,</p>
            <p>you were more about</p>
            <p tw="m-0">giving, than receiving</p>
            <p>this year</p>
          </div>
        ) : (
          <div tw="flex text-xl leading-[8px] flex-col mt-8">
            <p tw="m-0">About PRs,</p>
            <p>you were more about</p>
            <p tw="m-0">receiving, than giving</p>
            <p>this year</p>
          </div>
        )}
      </div>
      <img
        tw="absolute bottom-[-20px] right-[-20px]"
        width={180}
        src={joey}
        alt=""
      />
    </RootCard>
  );
};

interface PieChartProps {
  reviewedPrs: number;
  authoredPrs: number;
}

const PieChart: React.FC<PieChartProps> = ({ authoredPrs, reviewedPrs }) => {
  const data = [authoredPrs, reviewedPrs];
  const total = authoredPrs + reviewedPrs;

  let startAngle = 0;

  return (
    <div tw="flex flex-col relative p-1">
      <svg
        width="160"
        height="160"
        viewBox="-1 -1 202 202"
        xmlns="http://www.w3.org/2000/svg"
      >
        {data.map((value, index) => {
          const percentage = (value / total) * 100;
          const endAngle = startAngle + (percentage * 360) / 100;

          const startX = Math.cos((startAngle * Math.PI) / 180) * 100 + 100;
          const startY = Math.sin((startAngle * Math.PI) / 180) * 100 + 100;
          const endX = Math.cos((endAngle * Math.PI) / 180) * 100 + 100;
          const endY = Math.sin((endAngle * Math.PI) / 180) * 100 + 100;

          const largeArcFlag = percentage > 50 ? 1 : 0;

          const path = `M 100 100 L ${startX} ${startY} A 100 100 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;

          startAngle = endAngle;

          return (
            <path
              key={index}
              d={path}
              fill={index === 0 ? colors.authored : colors.reviewed}
              stroke="#000"
              strokeWidth="2"
            />
          );
        })}
      </svg>
    </div>
  );
};
