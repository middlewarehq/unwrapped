import axios from 'axios';
import { GitHubDataResponse } from '../../../types/api-responses';
import chalk from 'chalk';
import { createImageUsingVercel } from '../../../api-helpers/vercel-generator';
import { DEV } from '../../../constants/general';
import { updatedGhData } from '@/mocks/github';
import { getDataFromGithubResponse } from '@/api-helpers/card-data-adapter';
import { CardTypes, sequence } from '../../../types/cards';

export const fetchData = async (): Promise<GitHubDataResponse> => {
  if (process.env.NEXT_PUBLIC_APP_ENVIRONMENT === DEV) {
    return new Promise((resolve) => {
      resolve(updatedGhData);
    });
  }
  const response = await axios
    .get('url')
    .then((res) => res)
    .catch((err) => err);
  const data = response.data;
  return data as GitHubDataResponse;
};

export const generateImages = async (
  data: GitHubDataResponse,
  customSequence?: CardTypes[]
) => {
  console.log(chalk.yellow('Generating images...'));

  const cardSequence = customSequence || sequence;

  const adaptedData = getDataFromGithubResponse(data);
  const cardsToBeGenerated = cardSequence.filter((card) =>
    Boolean(adaptedData[card])
  );

  const imageFileBuffers = await Promise.all(
    cardsToBeGenerated.map((cardName, index) =>
      createImageUsingVercel(
        { ...adaptedData[cardName], username: data.user.login },
        cardName,
        'node',
        index
      )
    )
  );

  return imageFileBuffers;
};
