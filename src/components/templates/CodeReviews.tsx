import React, { FC } from 'react';
import { RootCard } from '@/components/templates/RootCard';
import { websiteUrl } from '../../constants/general';
import { Username } from '@/components/templates/index';

export type CodeReviewsData = {
  totalReviewers: number;
  topReviewer: string;
};

export const CodeReviews: FC<CodeReviewsData & Username> = ({
  topReviewer,
  totalReviewers,
  username
}) => {
  const drakeNope = `${websiteUrl}/assets/images/drakeNope.png`;
  const drakeYeah = `${websiteUrl}/assets/images/drakeYeah.png`;
  return (
    <RootCard bgColor="yellow" username={username} decoType="fireworks">
      <div tw="flex absolute w-[300px] top-[-40px] left-[-20px] text-md font-semibold">
        <img width={160} height={290} src={drakeNope} alt="" />
        <div tw="flex relative top-[90px] right-[45px] flex-col">
          <p tw="m-0">Having a lot of</p>
          <p tw="m-0 mt-2">Insta followers</p>
        </div>
      </div>
      <div tw="flex flex-col p-1 w-full h-full text-center relative justify-center items-center -mt-4">
        <div tw="flex text-4xl -mt-12 text-black items-baseline text-center">
          <h1 tw="m-0 relative top-2">
            {totalReviewers} dev{totalReviewers === 1 ? '' : 's'}
          </h1>
        </div>
        <div tw="flex text-xl leading-[16px] flex-col mt-4 text-center justify-center items-center">
          <p tw="m-0">Have reviewed your code</p>
          <p>
            #1 being <span tw="font-bold ml-1">@{topReviewer}</span>
          </p>
          <p tw="m-0 text-lg">Take a moment to thank them!</p>
        </div>
      </div>
      <div tw="flex absolute w-[300px] bottom-[-20px] right-[-20px] text-md font-semibold">
        <div tw="flex relative bottom-[50px] left-[40px] flex-col text-right">
          <p tw="m-0 ml-2">Having a lot of</p>
          <p tw="m-0 mt-2">code reviewers</p>
        </div>
        <img
          tw="absolute bottom-0 right-0"
          width={250}
          height={210}
          src={drakeYeah}
          alt=""
        />
      </div>
    </RootCard>
  );
};
