import { ImageResponse } from '@vercel/og';

export type ImageFile = {
  fileName: string;
  data: string;
  image?: ImageResponse;
  url: string;
};

export type ImagesWithBuffers = {
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
