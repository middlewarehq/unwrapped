import { useAppState } from '@/contexts/AppContext';
import React, { ReactNode } from 'react';
import { LoaderWithFacts } from '@/components/LoaderWithFacts';

export const AppLoadingStateWrapper: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const { isLoading } = useAppState();

  return (
    <div>
      {isLoading ? (
        <div className="h-screen flex flex-col items-center justify-between p-10">
          <LoaderWithFacts />
        </div>
      ) : (
        children
      )}
    </div>
  );
};
