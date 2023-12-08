import React, { FC, ReactNode, CSSProperties } from 'react';
import { CARD_HEIGHT, CARD_WIDTH, website_url } from '../../constants/general';
import Image from 'next/image';

type RootCard = {
  bg?: string;
  children: ReactNode;
  style?: CSSProperties;
};

export const RootCard: FC<RootCard> = ({ bg, children, style }) => {
  const computedStyle = {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    padding: '20px',
    ...style
  };

  // this is the only way to pass image urls for the vercel/og library
  const imageUrl = `${website_url}/${bg}`;

  return (
    <section style={computedStyle} tw="relative flex">
      <Image
        src={imageUrl}
        alt="bg"
        width={parseInt(CARD_WIDTH)}
        height={parseInt(CARD_HEIGHT)}
        tw="absolute top-0 left-0 z-0"
      />
      <div tw="flex z-10">{children}</div>
    </section>
  );
};
