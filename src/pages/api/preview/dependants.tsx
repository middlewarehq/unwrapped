import { createImageUsingVercel } from '@/api-helpers/vercel-generator';
import { CardTypes } from '../../../types/cards';
import { DependantsData } from '../../../components/templates/Dependants';

export const config = {
  runtime: 'edge'
};

const mockGithubDependants = [
  'jayantbh',
  'amoghjalan',
  'dhruvagarwal',
  'shivam-bit',
  'e-for-eshaan',
  'sidmohanty11',
  'Sing-Li',
  'adnanhashmi09',
  'axonasif',
  'Palanikannan1437',
  'Dnouv',
  'dkurt'
].slice(0, 4);

const mockGithubUser = 'eshaan007';

const data: DependantsData = {
  dependants: mockGithubDependants,
  username: mockGithubUser,
  userAvatar: 'https://avatars.githubusercontent.com/u/70485812?v=4'
};

const generateUsingVercel = async () => {
  return (
    await createImageUsingVercel(data, CardTypes.IT_TAKES_A_VILLAGE, 'browser')
  ).image;
};

export default generateUsingVercel;
