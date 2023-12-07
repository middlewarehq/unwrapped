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
  );
};

export default Previews;
