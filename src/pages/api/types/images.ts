import { ImageResponse } from '@vercel/og';

export type ImageFile = {
  fileName: string;
  data: Buffer;
  image?: ImageResponse;
};
