import { createContext, useContext } from "react";

const ViewportContext = createContext();

export const useViewportContext = () => {
  const context = useContext(ViewportContext);

  if (context === undefined) {
    throw new Error(
      "useViewportContext must be used within a useViewportContext provider"
    );
  }

  return context;
};

export default ViewportContext;
