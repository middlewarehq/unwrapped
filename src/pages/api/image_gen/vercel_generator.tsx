import { ImageFile } from '@/pages/api/types/images';
import { ImageResponse } from '@vercel/og';
import { arrayBufferToBuffer } from '@/pages/api/utils/general';

import { CardTypes } from '../types/cards';
import {
  CARD_HEIGHT,
  CARD_WIDTH,
  INTER_FONT_STYLES
} from '../constants/general';
import { CardTemplate, CardTemplateData } from './templates';
import { getFontsForImageGeneration } from '../utils/fonts';

export const createImageUsingVercel = async (
  data: CardTemplateData['data'],
  cardType: CardTypes,
  env: 'node' | 'browser',
  index?: number
): Promise<ImageFile> => {
  const fileName = (index || 0) + 1 + '.png';
  const fonts = await getFontsForImageGeneration(env);
  const generatedImage = new ImageResponse(
    <CardTemplate cardType={cardType} data={data} />,
    {
      width: parseInt(CARD_WIDTH),
      height: parseInt(CARD_HEIGHT),
      fonts: INTER_FONT_STYLES.map((fontData, index) => ({
        name: 'Inter',
        data: fonts[index],
        style: 'normal',
        weight: fontData.weight
      }))
    }
  );
  let imageCopy = generatedImage.clone();
  const imageArrayBuffer = await generatedImage.arrayBuffer();
  const imageBuffer = arrayBufferToBuffer(imageArrayBuffer);
  return {
    data: imageBuffer,
    fileName,
    image: imageCopy
  };
};
