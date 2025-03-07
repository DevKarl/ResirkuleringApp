import { useContext, useState, createContext } from "react";
export const appContext = createContext({
  user: null,
  publicTrashLocations: [],
  something: () => {},
});

export const useAppContext = () => useContext(appContext);

export const AppProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);
  const [publicTrashLocations, setPublicTrashLocations] = useState([]);

  const something = () => {};

  const contextValue = {
    user: user,
    publicTrashLocations: publicTrashLocations,
    something: something,
  };

  return (
    <appContext.Provider value={contextValue}>{children}</appContext.Provider>
  );
};
