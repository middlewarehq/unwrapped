import React, { ReactNode } from 'react';
import { LoaderWithFacts } from '@/components/LoaderWithFacts';
import { useSession } from 'next-auth/react';
import { useIsClient } from 'usehooks-ts';

export const AppLoadingStateWrapper: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const { status } = useSession();
  const isClient = useIsClient();

  return (
    <div>
      {status === 'loading' && isClient ? (
        <div className="h-screen flex flex-col items-center justify-between p-10">
          <LoaderWithFacts />
        </div>
      ) : (
        children
      )}
    </div>
  );
};
