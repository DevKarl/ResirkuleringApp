import { createContext, useContext, useState, ReactNode } from "react";

interface AppContextType {
  user: any;
  publicTrashLocations: any[];
  scanProductResult: any;
  setScanProductResult: React.Dispatch<React.SetStateAction<any>>;
}

export const appContext = createContext<AppContextType>({
  user: null,
  publicTrashLocations: [],
  scanProductResult: null,
  setScanProductResult: () => {},
});

export const useAppContext = () => useContext(appContext);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [user, setUser] = useState<any>(null);
  const [scanProductResult, setScanProductResult] = useState<any>(null);
  const [publicTrashLocations, setPublicTrashLocations] = useState<any[]>([]);

  const contextValue = {
    user,
    publicTrashLocations,
    scanProductResult,
    setScanProductResult,
  };

  return (
    <appContext.Provider value={contextValue}>{children}</appContext.Provider>
  );
};
