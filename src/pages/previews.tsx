import React from 'react';
import { CARD_HEIGHT, CARD_WIDTH } from '../constants/general';
import Image from 'next/image';

const Previews = () => {
  const links = [
    `/api/preview/intro`,
    `/api/preview/timebased/allday`,
    `/api/preview/timebased/night`,
    `/api/preview/timebased/day`,
    `/api/preview/guardian`,
    `/api/preview/authoredReviewed`,
    `/api/preview/dependants`,
    `/api/preview/contributions`,
    `/api/preview/zenNinja`,
    `/api/preview/streak`,
    `/api/preview/codeReviewers`,
    `/api/preview/oss`
  ];

  return (
    <div className="flex flex-col bg-white">
      <a
        className="m-4 bg-violet-400 w-fit mx-auto p-2 rounded-md hover:bg-violet-600 transform duration-300"
        href={`/api/download?format=archive`}
      >
        Download all
      </a>
      <div className="flex justify-between flex-wrap">
        {links.map((link, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-2 mt-2"
            >
              <p className="text-xl">{link.split('/').slice(-1)}</p>
              <Image
                src={link}
                alt="preview"
                width={parseInt(CARD_WIDTH)}
                height={parseInt(CARD_HEIGHT)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Previews;
