import React from 'react';
import { website_url } from './api/constants/general';

const Previews = () => {
  const links = [
    `${website_url}/api/preview/intro`,
    `${website_url}/api/preview/timebased/allday`,
    `${website_url}/api/preview/timebased/night`,
    `${website_url}/api/preview/timebased/day`
  ];

  return (
    <div className="flex flex-col">
      <a
        className="m-4 bg-violet-400 w-fit mx-auto p-2 rounded-md hover:bg-violet-600 transform duration-300"
        href={`${website_url}/api/download`}
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
              <img src={link} alt="preview" className="w-[400] h-[600]" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Previews;
