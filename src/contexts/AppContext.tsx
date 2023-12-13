import React, { useContext, createContext } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { logException } from '@/utils/logger';
import { useIsClient } from 'usehooks-ts';

interface AppStateInterface {}

const AppStateContext = createContext({} as AppStateInterface);

interface AppStateProviderInterface {
  children: React.ReactNode;
  value?: Partial<AppStateInterface>;
}

export const AppStateProvider = ({ children }: AppStateProviderInterface) => {
  const router = useRouter();
  const isClient = useIsClient();
  useSession({
    required: isClient,
    onUnauthenticated() {
      router.pathname !== '/' &&
        !router.pathname.startsWith('/view') &&
        router.push('/');
    }
  });

  return (
    <AppStateContext.Provider value={{}}>{children}</AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    logException('useGlobalState must be used within a GlobalStateContext');
    throw new Error('useGlobalState must be used within a GlobalStateContext');
  }
  return context;
};
