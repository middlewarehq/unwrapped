import { ImageResponse } from '@vercel/og';

import {
  COVER_HEIGHT,
  INTER_FONT_STYLES,
  COVER_SCALE_FACTOR,
  websiteUrl
} from '../constants/general';
import { getInterFonts } from '@/api-helpers/fonts';
import { COVER_WIDTH } from '@/constants/general';
import LogoSvg from '@/assets/unwrapped-logo.svg';
import { arrayBufferToBuffer } from './general';

export const createCoverUsingVercel = async (
  username: string,
  images: string[]
): Promise<Buffer> => {
  const interFonts = await getInterFonts('node');
  try {
    const generatedImage = new ImageResponse(
      (
        <div
          tw="flex relative"
          style={{
            width: parseInt(COVER_WIDTH),
            height: parseInt(COVER_HEIGHT),
            backgroundImage: `url(${websiteUrl}/${`assets/images/unwrappedBg.png`})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            color: 'white',
            backgroundColor: '#14183B',
            transform: `scale(${COVER_SCALE_FACTOR})`,
            transformOrigin: '0.0000000000000001px 0.0000000000000001px'
          }}
        >
          <LogoSvg
            style={{
              position: 'absolute',
              right: '-10px',
              bottom: '30px',
              opacity: 0.5,
              transform: `scale(${1.5})`,
              transformOrigin: '0.0000000000000001px 0.0000000000000001px'
            }}
          />
          <div tw="flex absolute left-10 bottom-10 items-end">
            <img src={images[0]} tw="w-[365px] rounded-2xl" alt="" />
            <img
              src={images[1]}
              tw="w-[296px] rounded-2xl relative right-[60px]"
              alt=""
            />
            <img
              src={images[2]}
              tw="w-[245px] rounded-2xl relative right-[110px]"
              alt=""
            />
          </div>
          <div tw="absolute right-10 top-10 flex flex-col items-end">
            <img
              src={websiteUrl + `/assets/images/unwrapped.svg`}
              alt=""
              height={75}
            />
            <div
              tw="flex"
              style={{
                fontFamily: 'Inter'
              }}
            >
              <h1 tw="text-[40px] font-serif mt-6 font-medium">
                {username} / 2023
              </h1>
            </div>
            <div
              tw="flex"
              style={{
                fontFamily: 'Inter'
              }}
            >
              <h4 tw="text-[34px] font-serif text-[#B795F3] font-medium -mt-3">
                unwrapped.dev
              </h4>
            </div>
          </div>
        </div>
      ),
      {
        width: parseInt(COVER_WIDTH) * COVER_SCALE_FACTOR,
        height: parseInt(COVER_HEIGHT) * COVER_SCALE_FACTOR,
        fonts: INTER_FONT_STYLES.map((fontData, index) => ({
          name: 'Inter',
          data: interFonts[index],
          weight: fontData.weight
        }))
      }
    );

    const imageArrayBuffer = await generatedImage.arrayBuffer();
    const imageBuffer = arrayBufferToBuffer(imageArrayBuffer);

    return imageBuffer;
  } catch (error) {
    console.error(error);
    throw new Error(`Image creation failed for cover`);
  }
};
