import React, {
  useState,
  useContext,
  createContext,
  SetStateAction,
  Dispatch
} from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

interface AppStateInterface {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const AppStateContext = createContext({} as AppStateInterface);

interface AppStateProviderInterface {
  children: React.ReactNode;
  value?: Partial<AppStateInterface>;
}

export const AppStateProvider = ({ children }: AppStateProviderInterface) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  useSession({
    required: true,
    onUnauthenticated() {
      router.pathname !== '/' && router.push('/');
    }
  });

  return (
    <AppStateContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateContext');
  }
  return context;
};
