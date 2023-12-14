import { fetchSavedCards } from '@/api-helpers/persistance';
import { createCoverUsingVercel } from '@/api-helpers/vercel-cover-generator';
import { CardTypes } from '@/types/cards';
import { extractFilenameWithoutExtension } from '@/utils/stringHelpers';
import { NextApiRequest, NextApiResponse } from 'next';

const fetchAndDownloadImageBuffer = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const username = req.query.username as string;

  if (!username) {
    return res.status(400).json({
      message: 'Invalid parameters, must pass valid username and hash.'
    });
  }

  const imageData = await fetchSavedCards(username, true);

  const images = imageData
    .sort((a, b) => {
      const indexA = priority.indexOf(
        extractFilenameWithoutExtension(a.fileName).toUpperCase() as CardTypes
      );
      const indexB = priority.indexOf(
        extractFilenameWithoutExtension(b.fileName).toUpperCase() as CardTypes
      );

      return indexA - indexB;
    })
    .slice(0, 3)
    .map((image) => {
      const file = extractFilenameWithoutExtension(image.fileName);
      const domain = process.env.NEXTAUTH_URL;
      return `${domain}/shared/public/${username}/${file}`;
    });

  const getCoverImage = await createCoverUsingVercel(username, images);
  res.setHeader('Content-Type', 'image/jpeg');
  res.setHeader('Content-Length', getCoverImage.length);
  res.send(getCoverImage);
};

export default fetchAndDownloadImageBuffer;

const priority = [
  CardTypes.YOUR_CONTRIBUTIONS,
  CardTypes.DAY_NIGHT_CYCLE,
  CardTypes.PR_REVIEWED_VS_AUTHORED,
  CardTypes.IT_TAKES_A_VILLAGE,
  CardTypes.TOP_REVIEWERS,
  CardTypes.CONTRIBUTION_STREAK,
  CardTypes.GUARDIAN_OF_PROD,
  CardTypes.ZEN_OR_NINJA,
  CardTypes.OSS_CONTRIBUTION,
  CardTypes.PRODUCTION_BREAKING,
  CardTypes.UNWRAPPED_INTRO
];
