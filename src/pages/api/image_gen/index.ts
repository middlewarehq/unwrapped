import axios from 'axios';
import { archiveFiles } from '@/pages/api/utils/archive';
import { GithubData } from '../types/ApiResponses';
import chalk from 'chalk';
import { ghData } from '../mocks/github';
import { cardTemplateAdaptor } from '@/pages/api/utils/general';
import { createImageUsingVercel } from './vercel_generator';
import { sequence } from '../types/cards';

const fetchData = async (): Promise<GithubData> => {
  if (process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'development') {
    return new Promise((resolve) => {
      resolve(ghData);
    });
  }
  const response = await axios
    .get('url')
    .then((res) => res)
    .catch((err) => err);
  const data = response.data;
  return data as GithubData;
};

export const generateImages = async () => {
  console.log(chalk.yellow('Fetching data...'));
  const fetchedData = await fetchData();
  console.log(chalk.yellow('Generating images...'));

  const adaptedData = cardTemplateAdaptor(fetchedData);
  const cardsToBeGenerated = sequence.filter((card) =>
    Boolean(adaptedData[card])
  );

  const imageFileBuffers = await Promise.all(
    cardsToBeGenerated.map((cardName) =>
      createImageUsingVercel(adaptedData[cardName], cardName)
    )
  );

  const data = await archiveFiles(
    imageFileBuffers.map(({ data, fileName }) => ({ data, fileName }))
  );
  return data;
};
