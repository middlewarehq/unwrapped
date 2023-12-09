import React, {
  useState,
  useContext,
  createContext,
  SetStateAction,
  Dispatch
} from 'react';

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
  const [isLoading, setIsLoading] = useState(false);

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
