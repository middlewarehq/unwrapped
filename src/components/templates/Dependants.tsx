import React, { FC } from 'react';
import { websiteUrl } from '../../constants/general';
import { RootCard } from './RootCard';
import { GithubReview } from '../../mocks/github';

export type DependantsData = {
  user: GithubReview;
  dependants: GithubReview[];
};

export const Dependants: FC<DependantsData> = ({ user, dependants }) => {
  const village = `${websiteUrl}/assets/images/village.png`;
  return (
    <RootCard bgColor="midnight">
      <div tw="flex flex-col p-1 relative w-full h-full">
        <div tw="flex text-2xl leading-[8px] font-semibold flex-col">
          <p>It takes a village</p>
          <p tw="m-0">to raise a PR!</p>
        </div>
        <div tw="flex text-black items-baseline">
          <Graph centralNode={user} attachedNodes={dependants} />
        </div>
        <div tw="flex text-xl leading-[16px] flex-col mt-12">
          <p tw="m-0">And shipping</p>
          <p>your code involved</p>
          <p tw="m-0">
            <span tw="font-semibold mr-1">{dependants.length} people</span> this
            year!
          </p>
        </div>
      </div>
      <img
        tw="absolute bottom-[-20px] right-[-20px]"
        width={270}
        src={village}
        alt=""
      />
    </RootCard>
  );
};

const Graph: FC<{
  centralNode: GithubReview;
  attachedNodes: GithubReview[];
}> = ({ centralNode, attachedNodes }) => {
  const centralNodeName = centralNode.name;

  // TODO: Render the graph correctly using suitable SVG logic

  return (
    <div tw="flex flex-col items-center justify-center  h-48">
      <div tw="flex flex-col items-center justify-center">
        <div tw="flex items-center justify-center">
          <img tw="w-8 rounded-full h-8" src={centralNode.avatar} alt="" />
          <p tw="text-xs m-0 ml-2">{centralNodeName}</p>
        </div>
        <div tw="flex items-center justify-center">
          {attachedNodes.map((item) => (
            <div key={item.userName} tw="flex items-center justify-center">
              <img tw="w-8 rounded-full h-8" src={item.avatar} alt="" />
              <p tw="text-xs m-0 ml-2">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
