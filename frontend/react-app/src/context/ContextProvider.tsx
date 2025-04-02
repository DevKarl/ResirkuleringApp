import { createContext, useContext, useState, ReactNode } from "react";
import { ScanAvfallResponse } from "../types";
import { User } from "../types/userTypes";

export type GivenWarnings = {
  admin: boolean;
};

interface AppContextType {
  user: User | null;
  scannedAvfallResult: ScanAvfallResponse | null;
  setScannedAvfallResult: (response: ScanAvfallResponse | null) => void;
  setUser: (reponse: User) => void;
  setGivenWarnings: (
    state: GivenWarnings | ((prev: GivenWarnings) => GivenWarnings)
  ) => void;
  givenWarnings: GivenWarnings;
}

const defaultContextValue: AppContextType = {
  user: null,
  scannedAvfallResult: null,
  givenWarnings: {
    admin: false,
  },
  setGivenWarnings: () => {},
  setScannedAvfallResult: () => {},
  setUser: () => {},
};

export const appContext = createContext<AppContextType>(defaultContextValue);

export const useAppContext = () => useContext(appContext);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [user, setUser] = useState(null);
  const [scannedAvfallResult, setScannedAvfallResult] = useState(null);
  const [givenWarnings, setGivenWarnings] = useState<GivenWarnings>({
    admin: false,
  });

  const contextValue = {
    user,
    scannedAvfallResult,
    givenWarnings,
    setGivenWarnings,
    setScannedAvfallResult,
    setUser,
  };

  return (
    <appContext.Provider value={contextValue}>{children}</appContext.Provider>
  );
};
