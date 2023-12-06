// src/exportToImage.ts
import dummyData from '../mocks/data.json';
import axios from 'axios';
import { archiveFiles } from '@/pages/api/utils/archive';
import { GithubData } from '../types/ApiResponses';
import { convertHtmlToImage } from './nodeHtmlToImage_generator';

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
  console.log('\x1b[33m%s\x1b[0m', 'Fetching data...');
  const fetchedData = await fetchData(true);
  console.log('\x1b[33m%s\x1b[0m', 'Generating images...');
  const imageFileBuffers = await Promise.all(
    fetchedData.data.map(async (data) => {
      const image = await convertHtmlToImage(data);
      return image;
    })
  );
  console.log('\x1b[33m%s\x1b[0m', 'Archiving images...');
  const data = await archiveFiles(imageFileBuffers);
  return data;
};
