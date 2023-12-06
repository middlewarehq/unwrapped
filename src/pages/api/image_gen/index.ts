import dummyData from '../mocks/data.json';
import axios from 'axios';
import { archiveFiles } from '@/pages/api/utils/archive';
import { GithubData } from '../types/ApiResponses';
import { createImageUsingVercel } from './vercel_generator';
import chalk from 'chalk';

const fetchData = async (isMockOn = false): Promise<GithubData> => {
  if (isMockOn) {
    return new Promise((resolve) => {
      resolve(dummyData);
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
  const fetchedData = await fetchData(true);
  console.log(chalk.yellow('Generating images...'));
  const imageFileBuffers = await Promise.all(
    fetchedData.data.map(async (data) => {
      const image = await createImageUsingVercel(data);
      return image;
    })
  );
  const data = await archiveFiles(
    imageFileBuffers.map(({ data, fileName }) => ({ data, fileName }))
  );
  return data;
};
