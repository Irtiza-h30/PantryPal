import { createContext, useContext } from "react";

const UserContext = createContext();

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error(
      "useUserContext must be used within a useUserContext provider"
    );
  }

  return context;
};

export default UserContext;
