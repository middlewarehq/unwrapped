import { GitHubDataResponse } from '../types/api-responses';
import chalk from 'chalk';
import { createImageUsingVercel } from './vercel-generator';
import { getDataFromGithubResponse } from '@/api-helpers/card-data-adapter';
import { CardTypes, sequence } from '../types/cards';
import { ImageFile } from '@/types/images';

export const generateImages = async (
  data: GitHubDataResponse,
  customSequence?: CardTypes[]
): Promise<ImageFile[]> => {
  try {
    console.log(chalk.yellow('Generating images...'));

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
        )
      )
    );

    return imageFileBuffers;
  } catch (error) {
    console.error('Error in generateImages:', error);
    throw new Error('Image generation failed');
  }
};
