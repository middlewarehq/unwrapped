import { ImageResponse } from '@vercel/og';

export type ImageJson = {
  fileName: string;
  data: string;
  url: string;
};

export type ImagesWithBuffers = {
  fileName: string;
  data: Buffer;
  image?: ImageResponse;
};

export type ImagesWithB64 = {
  fileName: string;
  data: string;
  image?: ImageResponse;
};

export type UpdatedImageFile = {
  fileName: string;
  data: string;
  url: string;
};

export type ImageAPIResponse = {
  data: UpdatedImageFile[];
  shareAllUrl: string;
};
