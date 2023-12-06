// src/exportToImage.ts
import * as fs from 'fs';
import { v4 as uuid } from 'uuid';
import dummyData from '../mocks/data.json';
import axios from 'axios';
import nodeHtmlToImage from 'node-html-to-image';
import { archiveFiles } from '@/pages/api/utils/archive';

type MetricData = {
  metric_title: 'Development Metrics';
  metric_username: '@john_dev';
  metric_name: 'Master Bug Slayer';
  metric_stat: '532';
};

export type ImageFile = { fileName: string; data: Buffer };

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
    tempHtml = tempHtml.replace(`{{${key}}}`, value);
  });

  const imageBuffer = await nodeHtmlToImage({
    html: tempHtml
  });

  return {
    fileName: outputImagePath,
    data: imageBuffer as Buffer
  };
}

const fetchData = async (isMockOn = false) => {
  if (isMockOn) return dummyData;
  const response = await axios
    .get('url')
    .then((res) => res)
    .catch((err) => err);
  const data = response.data;
  return data;
};

export const generateImages = async () => {
  const imageBuffers: ImageFile[] = [];
  const fetchedData = await fetchData(true);

  for (const data of fetchedData.data) {
    const image = await convertHtmlToImage(data);
    imageBuffers.push(image);
    const progress = Math.round(
      (imageBuffers.length / fetchedData.data.length) * 100
    );
    const formattedProgress = `\x1b[33mProcessing: ${progress.toFixed(
      0
    )}%\x1b[0m`;
    process.stdout.write(`\r${formattedProgress}`);
  }

  const data = await archiveFiles(imageBuffers);
  console.log('\x1b[32m%s\x1b[0m', '\nSuccess!\n');
  return data;
};
