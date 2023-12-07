import { ImageFile } from '@/pages/api/types/images';
import { ImageResponse } from '@vercel/og';
import { arrayBufferToBuffer } from '@/pages/api/utils/general';
import { v4 as uuid } from 'uuid';
import fs from 'fs';
import path from 'path';
import { IntroCardProps } from './templates/IntroCard';
import { CardTypes } from '../types/cards';
import { CARD_HEIGHT, CARD_WIDTH } from '../constants/general';
import { CardTemplate } from './templates';
import { TimeOfTheDayData } from '@/pages/api/image_gen/templates/TimeOfTheDay';

export const createImageUsingVercel = async (
  data: IntroCardProps | TimeOfTheDayData | null,
  cardType: CardTypes,
  env?: 'node' | 'browser'
): Promise<ImageFile> => {
  let interFont: Buffer | ArrayBuffer;

  // fetch works in browser only, not in node, vice-versa with fs
  if (env === 'browser') {
    interFont = await fetch(
      new URL('public/assets/fonts/Inter-ExtraBold.ttf', import.meta.url)
    ).then((res) => res.arrayBuffer());
  } else {
    interFont = fs.readFileSync(
      path.join(
        process.cwd(),
        'public',
        'assets',
        'fonts',
        'Inter-ExtraBold.ttf'
      )
    );
  }

  const fileName = uuid() + '.png';

  const generatedImage = new ImageResponse(
    <CardTemplate cardType={cardType} data={data} />,
    {
      width: parseInt(CARD_WIDTH),
      height: parseInt(CARD_HEIGHT),
      fonts: [
        {
          name: 'Inter',
          data: interFont,
          style: 'normal'
        }
      ]
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
