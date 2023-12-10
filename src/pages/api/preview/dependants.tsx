import { createImageUsingVercel } from '@/pages/api/image_gen/vercel_generator';
import { CardTypes } from '../types/cards';
import { DependantsData } from '../image_gen/templates/Dependants';
import { GithubReview } from '../mocks/github';

export const config = {
  runtime: 'edge'
};

const mockGithubDependants: GithubReview[] = [
  {
    name: 'John Doe',
    userName: 'johndoe',
    avatar: 'https://picsum.photos/id/11/200'
  },
  {
    name: 'Jane Doe',
    userName: 'janedoe',
    avatar: 'https://picsum.photos/id/21/200'
  },
  {
    name: 'John Smith',
    userName: 'johnsmith',
    avatar: 'https://picsum.photos/id/31/200'
  }
];

const mockGithubUser: GithubReview = {
  name: 'eshaan',
  userName: 'eshaan007',
  avatar: 'https://picsum.photos/id/41/200'
};

const data: DependantsData = {
  dependants: mockGithubDependants,
  user: mockGithubUser
};

const generateUsingVercel = async () => {
  return (
    await createImageUsingVercel(data, CardTypes.IT_TAKES_A_VILLAGE, 'browser')
  ).image;
};

export default generateUsingVercel;
