import React, { ReactNode } from 'react';
import { LoaderWithFacts } from '@/components/LoaderWithFacts';
import { useSession } from 'next-auth/react';

export const AppLoadingStateWrapper: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const { status } = useSession();
  return (
    <div>
      {status === 'loading' ? (
        <div className="h-screen flex flex-col items-center justify-between p-10">
          <LoaderWithFacts />
        </div>
      ) : (
        children
      )}
    </div>
  );
};
