import * as fs from 'fs';
import { v4 as uuid } from 'uuid';
import nodeHtmlToImage from 'node-html-to-image';
import { ImageFile, MetricData } from '@/pages/api/types/images';

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
