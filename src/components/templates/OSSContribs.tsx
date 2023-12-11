import React, { FC } from 'react';
import { RootCard } from '@/components/templates/RootCard';
import { websiteUrl } from '../../constants/general';
import { GithubRepositoryContributionData } from '@/types/api-responses';
import pluralize from 'pluralize';
import { Username } from '@/components/templates/index';

export type OSSContribsData = {
  contribs: GithubRepositoryContributionData[];
};

export const OSSContribs: FC<OSSContribsData & Username> = ({
  contribs,
  username
}) => {
  const img = `${websiteUrl}/assets/images/philanthropist.png`;

  return (
    <RootCard bgColor="babyBlue" username={username}>
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
        <div tw="flex text-xl leading-[16px] flex-col mt-12 font-medium">
          <p tw="m-0">Had open source contribs</p>
          <p>by you this year</p>
        </div>
        <div tw="flex flex-col h-48 justify-end">
          <p tw="m-0 font-bold text-xl mb-3">
            Top {contribs.slice(0, 3).length}
          </p>
          {contribs.slice(0, 3).map((contrib, i) => (
            <div key={i} tw="flex flex-col h-fit w-fit mb-2">
              <span tw="text-sm leading-none">{contrib.org_name}</span>
              <span tw="text-md font-medium leading-none">
                {contrib.repo_name}
              </span>
            </div>
          ))}
        </div>
      </div>
      <img
        tw="absolute top-[300px] left-[140px]"
        width={250}
        src={img}
        alt=""
      />
    </RootCard>
  );
};
