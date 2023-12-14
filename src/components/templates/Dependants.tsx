import React, { FC } from 'react';
import { websiteUrl } from '../../constants/general';
import { RootCard } from './RootCard';
import { Username } from '@/components/templates/index';
import { uniq } from 'ramda';

export type DependantsData = {
  userAvatar: string;
  dependants: string[];
  username: string;
};

const DEFAULT_AVATAR = `${websiteUrl}/assets/images/default-avatar.png`;

export const Dependants: FC<DependantsData & Username> = ({
  username,
  dependants,
  userAvatar
}) => {
  const uniqUsers = uniq(dependants);
  const village = `${websiteUrl}/assets/images/village.png`;
  const abstract = `${websiteUrl}/assets/images/abstract-shape.png`;
  const attachedNodes = uniqUsers
    .slice(0, 4)
    .map((userName) => '@' + shortenUsername(userName));

  const centralNode = {
    userName: '@' + shortenUsername(username),
    avatar: userAvatar ? userAvatar : DEFAULT_AVATAR
  };
  return (
    <RootCard bgColor="pearlGreen" username={username}>
      <img
        tw="absolute top-[110px] right-[50px]"
        width={270}
        height={250}
        src={abstract}
        alt=""
        style={{ transform: 'rotate(135deg)' }}
      />
      <div tw="flex flex-col p-1 relative w-full h-full">
        <div tw="flex text-2xl leading-[8px] font-semibold flex-col">
          <p>It takes a village</p>
          <p tw="m-0">to raise a PR!</p>
        </div>
        <div tw="flex text-black mt-8">
          <Graph attachedNodes={attachedNodes} centralNode={centralNode} />
        </div>
        <div tw="flex text-xl leading-[16px] flex-col mt-12">
          <p tw="m-0">And shipping</p>
          <p>your code involved</p>
          <p tw="m-0">
            <span tw="font-semibold mr-1">{uniqUsers.length} people</span> this
            year!
          </p>
        </div>
      </div>
      <img
        tw="absolute bottom-[-20px] right-[-20px]"
        width={270}
        height={250}
        src={village}
        alt=""
      />
    </RootCard>
  );
};

const graphAccent = '#44B075';
const Graph: FC<{
  centralNode: { userName: string; avatar?: string };
  attachedNodes: string[];
}> = ({ centralNode, attachedNodes }) => {
  if (attachedNodes.length === 0) return null;
  else if (attachedNodes.length === 1)
    return (
      <div tw="flex flex-col items-center w-full">
        <div tw="flex relative justify-start w-full">
          <div
            tw="flex absolute left-12 -bottom-[120px]"
            style={{
              transform: 'rotate(270deg)'
            }}
          >
            <Arrow />
          </div>
        </div>
        <div tw="flex w-full">
          <div
            tw={`flex text-xs relative mr-1 top-4 p-1 bg-[${graphAccent}] rounded-lg items-center`}
          >
            {attachedNodes[0]}
          </div>
        </div>

        <div
          tw={`my-4 flex relative top-4 p-1 mx-1 bg-[${graphAccent}] rounded-full items-center`}
        >
          <p tw="text-[10px] -top-12 w-20 text-center -left-4 font-semibold absolute">
            My top reviewers
          </p>
          <img
            src={centralNode.avatar || DEFAULT_AVATAR}
            width={40}
            height={40}
            tw={'rounded-full'}
            alt="avatar"
          />
        </div>
      </div>
    );
  else if (attachedNodes.length === 2)
    return (
      <div tw="flex flex-col items-center w-full">
        <div tw="flex relative justify-start w-full">
          <div
            tw="flex absolute left-12 -bottom-[120px]"
            style={{
              transform: 'rotate(270deg)'
            }}
          >
            <Arrow />
          </div>
        </div>
        <div tw="flex w-full">
          <div
            tw={`flex text-xs relative mr-1 top-4 p-1 bg-[${graphAccent}] rounded-lg items-center`}
          >
            {attachedNodes[0]}
          </div>
        </div>

        <div
          tw={`my-4 flex relative top-4 p-1 mx-1 bg-[${graphAccent}] rounded-full items-center`}
        >
          <p tw="text-[10px] -top-12 w-20 text-center -left-4 font-semibold absolute">
            My top reviewers
          </p>
          <img
            src={centralNode.avatar || DEFAULT_AVATAR}
            width={40}
            height={40}
            tw={'rounded-full'}
            alt="avatar"
          />
        </div>
        <div tw="flex relative justify-end w-full">
          <div
            tw="flex absolute right-12 -top-16"
            style={{
              transform: 'rotate(90deg)'
            }}
          >
            <Arrow />
          </div>
        </div>
        <div tw="flex w-full justify-end">
          <div
            tw={`flex text-xs relative top-4 ml-1 p-1 bg-[${graphAccent}] rounded-lg items-center`}
          >
            {attachedNodes[1]}
          </div>
        </div>
      </div>
    );
  else if (attachedNodes.length === 3)
    return (
      <div tw="flex flex-col items-center w-full">
        <div tw="flex relative justify-start w-full">
          <div
            tw="flex absolute left-12 -bottom-[120px]"
            style={{
              transform: 'rotate(270deg)'
            }}
          >
            <Arrow />
          </div>
        </div>
        <div tw="flex w-full">
          <div
            tw={`flex text-xs relative mr-1 top-4 p-1 bg-[${graphAccent}] rounded-lg items-center`}
          >
            {attachedNodes[0]}
          </div>
        </div>

        <div
          tw={`my-4 flex relative top-4 p-1 mx-1 bg-[${graphAccent}] rounded-full items-center`}
        >
          <p tw="text-[10px] -top-12 w-20 text-center -left-4 font-semibold absolute">
            My top reviewers
          </p>
          <img
            src={centralNode.avatar || DEFAULT_AVATAR}
            width={40}
            height={40}
            tw={'rounded-full'}
            alt="avatar"
          />
        </div>
        <div tw="flex relative justify-end w-full">
          <div
            tw="flex absolute right-12 -top-16"
            style={{
              transform: 'rotate(90deg)'
            }}
          >
            <Arrow />
          </div>
        </div>
        <div tw="flex w-full justify-end">
          <div
            tw={`flex text-xs relative top-4 ml-1 p-1 bg-[${graphAccent}] rounded-lg items-center`}
          >
            {attachedNodes[1]}
          </div>
        </div>
        <div tw="flex relative">
          <div
            tw="absolute flex -left-40 -bottom-10"
            style={{
              transform: 'rotate(-5deg)'
            }}
          >
            <ThirdArrow />
          </div>
        </div>
        <div tw="flex w-full justify-start mt-4">
          <div
            tw={`flex text-xs relative top-4 ml-1 p-1 bg-[${graphAccent}] rounded-lg items-center`}
          >
            {attachedNodes[2]}
          </div>
        </div>
      </div>
    );
  else if (attachedNodes.length === 4)
    return (
      <div tw="flex flex-col items-center w-full -mt-7">
        <div tw="flex relative">
          <div
            tw="absolute flex -right-40 -bottom-26"
            style={{
              transform: 'rotate(-185deg)'
            }}
          >
            <ThirdArrow />
          </div>
        </div>
        <div tw="flex w-full justify-end mb-4">
          <div
            tw={`flex text-xs relative top-4 ml-1 p-1 bg-[${graphAccent}] rounded-lg items-center`}
          >
            {attachedNodes[3]}
          </div>
        </div>
        <div tw="flex relative justify-start w-full">
          <div
            tw="flex absolute left-12 -bottom-[120px]"
            style={{
              transform: 'rotate(270deg)'
            }}
          >
            <Arrow />
          </div>
        </div>
        <div tw="flex w-full">
          <div
            tw={`flex text-xs relative mr-1 top-4 p-1 bg-[${graphAccent}] rounded-lg items-center`}
          >
            {attachedNodes[0]}
          </div>
        </div>
        <div
          tw={`my-4 flex relative top-4 p-1 mx-1 bg-[${graphAccent}] rounded-full items-center`}
        >
          <p tw="text-[10px] -top-12 w-20 text-center -left-4 font-semibold absolute">
            My top reviewers
          </p>
          <img
            src={centralNode.avatar || DEFAULT_AVATAR}
            width={40}
            height={40}
            tw={'rounded-full'}
            alt="avatar"
          />
        </div>
        <div tw="flex relative justify-end w-full">
          <div
            tw="flex absolute right-12 -top-16"
            style={{
              transform: 'rotate(90deg)'
            }}
          >
            <Arrow />
          </div>
        </div>
        <div tw="flex w-full justify-end">
          <div
            tw={`flex text-xs relative top-4 ml-1 p-1 bg-[${graphAccent}] rounded-lg items-center`}
          >
            {attachedNodes[1]}
          </div>
        </div>
        <div tw="flex relative">
          <div
            tw="absolute flex -left-40 -bottom-10"
            style={{
              transform: 'rotate(-5deg)'
            }}
          >
            <ThirdArrow />
          </div>
        </div>
        <div tw="flex w-full justify-start mt-4">
          <div
            tw={`flex text-xs relative top-4 ml-1 p-1 bg-[${graphAccent}] rounded-lg items-center`}
          >
            {attachedNodes[2]}
          </div>
        </div>
      </div>
    );
};

const Arrow = () => (
  <svg
    width="50"
    height="130"
    viewBox="0 0 71 175"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M66.0508 2C67.6893 2 69 3.45532 69 5.27447C69 7.09362 67.6893 8.54894 66.0508 8.54894C64.4124 8.54894 63.1017 7.09362 63.1017 5.27447C63.1017 3.45532 64.4124 2 66.0508 2Z"
      fill="white"
    />
    <path
      d="M12.0234 174.097C11.4178 174.662 10.4686 174.629 9.90338 174.023L0.692403 164.154C0.127172 163.548 0.159933 162.599 0.765578 162.034C1.37122 161.469 2.3204 161.501 2.88564 162.107L11.0732 170.88L19.8461 162.692C20.4517 162.127 21.4009 162.16 21.9662 162.766C22.5314 163.371 22.4986 164.32 21.893 164.886L12.0234 174.097ZM67.5 5.27447C67.5 4.13225 66.7171 3.5 66.0508 3.5V0.5C68.6615 0.5 70.5 2.77839 70.5 5.27447H67.5ZM66.0508 3.5C65.3846 3.5 64.6017 4.13225 64.6017 5.27447H61.6017C61.6017 2.77839 63.4402 0.5 66.0508 0.5V3.5ZM64.6017 5.27447C64.6017 6.41669 65.3846 7.04894 66.0508 7.04894V10.0489C63.4402 10.0489 61.6017 7.77054 61.6017 5.27447H64.6017ZM66.0508 7.04894C66.7171 7.04894 67.5 6.41669 67.5 5.27447H70.5C70.5 7.77054 68.6615 10.0489 66.0508 10.0489V7.04894ZM63.1017 5.27447C63.1017 6.77447 63.1042 6.77447 63.1065 6.77446C63.107 6.77446 63.1092 6.77445 63.1102 6.77444C63.1124 6.77443 63.1138 6.77441 63.1146 6.7744C63.1162 6.77437 63.115 6.77438 63.1112 6.77449C63.1034 6.77471 63.0849 6.77536 63.056 6.77704C62.998 6.78042 62.8983 6.78798 62.7592 6.80469C62.4812 6.83812 62.0456 6.90822 61.4729 7.05506C60.3291 7.34832 58.6295 7.94991 56.5383 9.18636C52.3615 11.656 46.5609 16.6962 40.5155 26.9993C28.4008 47.6461 15.3905 89.2809 12.4991 173.052L9.50089 172.948C12.3986 88.9935 25.4391 46.7656 37.928 25.481C44.1844 14.8184 50.3237 9.37577 55.0114 6.604C57.3526 5.21973 59.3163 4.51097 60.7278 4.14906C61.4328 3.9683 61.9979 3.87462 62.4011 3.82614C62.6027 3.80191 62.7637 3.78899 62.8814 3.78213C62.9402 3.7787 62.9882 3.77678 63.0251 3.77573C63.0435 3.7752 63.0591 3.77488 63.0719 3.7747C63.0783 3.77461 63.084 3.77455 63.0889 3.77452C63.0914 3.7745 63.0946 3.77448 63.0959 3.77448C63.0989 3.77447 63.1017 3.77447 63.1017 5.27447Z"
      fill={graphAccent}
    />
  </svg>
);

const ThirdArrow = () => (
  <svg
    width={268 / 2.1}
    height={238 / 3.1}
    viewBox="0 0 268 238"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M266.322 24.6218C267.493 23.8916 267.851 22.3497 267.121 21.1779L255.223 2.08143C254.493 0.909581 252.951 0.551514 251.779 1.28167C250.607 2.01182 250.249 3.5537 250.979 4.72556L261.556 21.7002L244.581 32.2767C243.409 33.0068 243.051 34.5487 243.781 35.7206C244.511 36.8924 246.053 37.2505 247.225 36.5203L266.322 24.6218ZM13.4424 235.969C1.01188 178.788 4.09307 135.675 17.0754 103.522C30.039 71.4153 52.9774 49.9818 80.7901 36.3059C136.597 8.86517 211.916 12.739 264.434 24.9351L265.565 20.0647C212.583 7.76085 135.902 3.63472 78.5838 31.819C49.834 45.9556 25.9286 68.2408 12.4391 101.65C-1.03163 135.012 -4.01294 179.211 8.55653 237.031L13.4424 235.969Z"
      fill={graphAccent}
    />
  </svg>
);

const shortenUsername = (username: string) => {
  const split = username.split('');
  if (split.length > 18) {
    return split.slice(0, 18).join('') + '...';
  }
  return username;
};
