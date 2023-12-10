import React, { FC } from 'react';
import { RootCard } from '@/components/templates/RootCard';
import { websiteUrl } from '../../constants/general';
import { GithubRepositoryContributionData } from '@/types/api-responses';
import pluralize from 'pluralize';

export type OSSContribsData = {
  contribs: GithubRepositoryContributionData[];
};

export const OSSContribs: FC<OSSContribsData> = ({ contribs }) => {
  const img = `${websiteUrl}/assets/images/philanthropist.png`;

  console.log(contribs);

  return (
    <RootCard bgColor="babyBlue">
      <div tw="flex flex-col p-1 relative w-full h-full">
        <div tw="flex text-2xl leading-[8px] font-semibold flex-col">
          <p>You know, I&apos;m something of</p>
          <p tw="m-0">a philanthropist myself</p>
        </div>
        <div tw="flex text-4xl mt-8 text-black items-baseline">
          <h1 tw="m-0 relative top-2">
            {contribs.length} {pluralize('repo', contribs.length)}
          </h1>
        </div>
        <div tw="flex text-xl leading-[16px] flex-col mt-12">
          <p tw="m-0">Had open source contribs</p>
          <p>by you this year</p>
        </div>
        <div tw="flex text-xl leading-[16px] flex-col mt-12">
          <p tw="m-0 font-bold">Top 3</p>
          {contribs.slice(0, 3).map((contrib, i) => (
            <div key={i} tw="flex flex-col h-fit w-fit">
              <p tw="text-sm leading-none">{contrib.org_name}</p>
              <p tw="font-medium leading-none">{contrib.repo_name}</p>
            </div>
          ))}
        </div>
      </div>
      <img
        tw="absolute top-[317px] left-[153px]"
        width={200}
        src={img}
        alt=""
      />
    </RootCard>
  );
};
