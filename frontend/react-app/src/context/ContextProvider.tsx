import { createContext, useContext, useState, ReactNode } from "react";
import { ScanAvfallResponse } from "../types";

interface AppContextType {
  bruker: any;
  scannedAvfallResult: ScanAvfallResponse;
  setScannedAvfallResult: (response: ScanAvfallResponse) => void;
}

const defaultContextValue: AppContextType = {
  bruker: null,
  scannedAvfallResult: null,
  setScannedAvfallResult: () => {},
};

export const appContext = createContext<AppContextType>(defaultContextValue);

export const useAppContext = () => useContext(appContext);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [bruker, setUser] = useState<any>(null);
  const [scannedAvfallResult, setScannedAvfallResult] =
    useState<ScanAvfallResponse>(null);

  const contextValue = {
    bruker,
    scannedAvfallResult,
    setScannedAvfallResult,
  };

  return (
    <appContext.Provider value={contextValue}>{children}</appContext.Provider>
  );
};
