import { createImageUsingVercel } from '@/api-helpers/vercel-generator';
import { CardTypes } from '../../../types/cards';
import { OSSContribsData } from '@/components/templates/OSSContribs';

export const config = {
  runtime: 'edge'
};

const data: OSSContribsData = {
  // up and down values for the graph
  contribs: [
    {
      contributions_count: 20,
      org_name: 'middlewarehq',
      repo_name: 'web-manager-dash',
      org_avatar_url: 'https://github.com/middlewarehq.png'
    },
    {
      contributions_count: 10,
      org_name: 'middlewarehq',
      repo_name: 'monorepo',
      org_avatar_url: 'https://github.com/middlewarehq.png'
    },
    {
      contributions_count: 5,
      org_name: 'middlewarehq',
      repo_name: 'unwrapped',
      org_avatar_url: 'https://github.com/middlewarehq.png'
    }
  ]
};

const generateUsingVercel = async () => {
  return (
    await createImageUsingVercel(
      data as OSSContribsData,
      CardTypes.OSS_CONTRIBUTION,
      'browser'
    )
  ).image;
};

export default generateUsingVercel;
