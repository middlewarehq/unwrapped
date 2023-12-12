import { ImageFile } from '@/types/images';
import { ImageResponse } from '@vercel/og';
import { arrayBufferToBuffer } from '@/api-helpers/general';

import { CardTypes } from '../types/cards';
import {
  CARD_HEIGHT,
  CARD_WIDTH,
  INTER_FONT_STYLES
} from '../constants/general';
import { CardTemplate, CardTemplateData } from '../components/templates';
import { getInterFonts } from './fonts';
import { SCALE_FACTOR } from '@/constants/general';
import { logException } from '@/utils/logger';

export const createImageUsingVercel = async (
  data: CardTemplateData['data'],
  cardType: CardTypes,
  env: 'node' | 'browser' = 'node'
): Promise<ImageFile> => {
  const fileName = `${cardType.toLowerCase()}.png`;
  try {
    const interFonts = await getInterFonts(env);

    const generatedImage = new ImageResponse(
      <CardTemplate cardType={cardType} data={data} />,
      {
        width: parseInt(CARD_WIDTH) * SCALE_FACTOR,
        height: parseInt(CARD_HEIGHT) * SCALE_FACTOR,
        fonts: INTER_FONT_STYLES.map((fontData, index) => ({
          name: 'Inter',
          data: interFonts[index],
          style: 'normal',
          weight: fontData.weight
        }))
      }
    );

    let imageCopy = generatedImage.clone();
    let imageArrayBuffer;

    try {
      imageArrayBuffer = await generatedImage.arrayBuffer();
    } catch (error) {
      logException(`Error converting image to array buffer for ${cardType}`, {
        originalException: error
      });
      throw new Error(`Image buffer creation failed for ${cardType}`);
    }

    const imageBuffer = arrayBufferToBuffer(imageArrayBuffer);

    return {
      data: imageBuffer,
      fileName,
      image: imageCopy
    };
  } catch (error) {
    logException(`Error in createImageUsingVercel for ${cardType}:`, {
      originalException: error
    });
    throw new Error(`Image creation failed for ${cardType}`);
  }
};
