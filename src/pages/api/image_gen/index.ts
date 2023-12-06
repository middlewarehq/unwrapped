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

export async function convertHtmlToImage(data: MetricData): Promise<string> {
  const outputImagePath = `src/pages/api/outputs/${uuid()}.png`;
  let tempHtml = completeHtml;
  Object.entries(data).forEach(([key, value]) => {
    tempHtml = tempHtml.replace(`{{${key}}}`, value);
  });

  // Use node-html-to-image to convert HTML to an image
  const imageBuffer = await nodeHtmlToImage({
    output: outputImagePath,
    html: tempHtml
  });

  // Save the image to a file
  fs.writeFileSync(outputImagePath, imageBuffer as string);

  return outputImagePath;
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
  const image_array: string[] = [];
  const fetchedData = await fetchData(true);

  for (const data of fetchedData.data) {
    const image = await convertHtmlToImage(data);
    image_array.push(image);
    console.log(`Exported to ${image}`);
  }
  const outputPath = `src/pages/api/outputs/${uuid()}.zip`;

  await archiveFiles(image_array, outputPath);

  return { images: image_array, zip: outputPath };
};
