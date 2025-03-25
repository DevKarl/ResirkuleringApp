import { createContext, useContext, useState, ReactNode } from "react";
import { ScanAvfallResponse } from "../types";
import { User } from "../types/userTypes";

interface AppContextType {
  user: any;
  scannedAvfallResult: ScanAvfallResponse;
  setScannedAvfallResult: (response: ScanAvfallResponse) => void;
  setUser: (reponse: User) => void;
}

const defaultContextValue: AppContextType = {
  user: null,
  scannedAvfallResult: null,
  setScannedAvfallResult: () => {},
  setUser: () => {},
};

export const appContext = createContext<AppContextType>(defaultContextValue);

export const useAppContext = () => useContext(appContext);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [user, setUser] = useState<any>(null);
  const [scannedAvfallResult, setScannedAvfallResult] =
    useState<ScanAvfallResponse>(null);

  const contextValue = {
    user,
    scannedAvfallResult,
    setScannedAvfallResult,
    setUser,
  };

  return (
    <appContext.Provider value={contextValue}>{children}</appContext.Provider>
  );
};
