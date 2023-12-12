import React, { FC, PropsWithChildren } from 'react';

export const IndexPageSection: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative flex flex-col p-4 sm:p-6 md:p-8 lg:p-10 min-h-screen max-w-[100vw]">
      {children}
    </div>
  );
};
