import { GitHubDataResponse } from '../types/api-responses';
import chalk from 'chalk';
import { createImageUsingVercel } from './vercel-generator';
import { getDataFromGithubResponse } from '@/api-helpers/card-data-adapter';
import { CardTypes, sequence } from '../types/cards';
import { ImageFile } from '@/types/images';
import { logException } from '@/utils/logger';

export const generateImages = async (
  data: GitHubDataResponse,
  customSequence?: CardTypes[]
): Promise<ImageFile[]> => {
  try {
    console.info(chalk.yellow('Generating images...'));

    const cardSequence = customSequence || sequence;

    const adaptedData = getDataFromGithubResponse(data);
    const cardsToBeGenerated = cardSequence.filter((card) =>
      Boolean(adaptedData[card])
    );

    const imageFileBuffers = await Promise.all(
      cardsToBeGenerated.map((cardName) =>
        createImageUsingVercel(
          { ...adaptedData[cardName], username: data.user.login },
          cardName
        ).catch(() => null)
      )
    );

    return imageFileBuffers.filter(Boolean) as ImageFile[];
  } catch (error) {
    console.error('Error in generateImages:', error);
    logException('Error in generateImages', { originalException: error });
    throw new Error('Image generation failed');
  }
};
