import { createCoverUsingVercel } from '@/api-helpers/vercel-cover-generator';
import { websiteUrl } from '@/constants/general';
import { bcryptGen } from '@/utils/stringHelpers';

export const config = {
  runtime: 'edge'
};

const generateCover = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username') as string;
  const card1 = searchParams.get('card1') as string;
  const card2 = searchParams.get('card2') as string;
  const card3 = searchParams.get('card3') as string;

  const customSequence = [card1, card2, card3];
  const images = customSequence.map((cardType) => {
    const hash = bcryptGen(username + cardType);
    const url = `${websiteUrl}/shared/${username}/${cardType}/${hash}`;
    return url;
  });

  console.log({
    username,
    card1,
    card2,
    card3,
    images
  });

  return await createCoverUsingVercel(username, images);
};

export default generateCover;
