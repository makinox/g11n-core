import React, { createContext, useEffect } from 'react';

type SheetContextState = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  enviromentData: any;
};

export const SheetContext = createContext<SheetContextState | undefined>(undefined);

export const SheetProvider = ({ children }) => {
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('api/getInitialData');
      const data = await res.json();
      console.log({ data });
    };
    fetchData();
  }, []);

  return (
    <SheetContext.Provider
      value={{
        enviromentData: {},
      }}
    >
      {children}
    </SheetContext.Provider>
  );
};

export const useSheet = () => {
  const context = React.useContext(SheetContext);
  if (context === undefined) {
    throw new Error('useSheet must be used within a SheetContext.Provider');
  }
  return context;
};
