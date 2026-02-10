import { createContext, useState } from "react";

export const UIContext = createContext();

export function UIProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(null);

  return (
    <UIContext.Provider
      value={{
        loading,
        setLoading,
        modal,
        setModal,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

