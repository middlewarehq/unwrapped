// src/exportToImage.ts
import * as fs from 'fs';
import { v4 as uuid } from 'uuid';
import dummyData from '../mocks/data.json';
import axios from 'axios';
import nodeHtmlToImage from 'node-html-to-image';
import { archiveFiles } from '@/pages/api/utils/archive';
import { ImageFile, MetricData } from '../types/images';
import { GithubData } from '../types/ApiResponses';

const htmlFilePath = 'src/pages/api/templates/intro_slide/index.html';
const rawHtmlContent = fs.readFileSync(htmlFilePath, 'utf-8');

const cssFilePath = 'src/pages/api/templates/intro_slide/index.css';
const fontsPath = 'src/pages/api/templates/fonts.css';
const baseCssPath = 'src/pages/api/templates/global.css';
const cssContent =
  fs.readFileSync(cssFilePath, 'utf-8') +
  fs.readFileSync(fontsPath, 'utf-8') +
  fs.readFileSync(baseCssPath, 'utf-8');
const completeHtml = `<style>${cssContent}</style>${rawHtmlContent}`;

export async function convertHtmlToImage(data: MetricData): Promise<ImageFile> {
  const outputImagePath = `${uuid()}.png`;
  let tempHtml = completeHtml;

  Object.entries(data).forEach(([key, value]) => {
    tempHtml = tempHtml.replace(`{{${key}}}`, value as string);
  });

  const imageBuffer = await nodeHtmlToImage({
    html: tempHtml
  });

  return {
    fileName: outputImagePath,
    data: imageBuffer as Buffer
  };
}

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
