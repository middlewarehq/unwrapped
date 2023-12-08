import Image from 'next/image';
import React from 'react';

const Previews = () => {
  const links = [
    `/api/preview/intro`,
    `/api/preview/timebased/allday`,
    `/api/preview/timebased/night`,
    `/api/preview/timebased/day`
  ];

  return (
    <div className="flex flex-col">
      <a
        className="m-4 bg-violet-400 w-fit mx-auto p-2 rounded-md hover:bg-violet-600 transform duration-300"
        href={`/api/download`}
      >
        Download all
      </a>
      <div className="flex justify-between  flex-wrap">
        {links.map((link, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-2 mt-2"
            >
              <p className="text-xl">{link.split('/').slice(-1)}</p>
              <Image src={link} alt="preview" className="w-[400] h-[600]" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Previews;
