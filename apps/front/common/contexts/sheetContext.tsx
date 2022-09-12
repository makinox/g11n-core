// import { getEnvData } from '@g11n-core/generator';
import React, { createContext } from 'react';

// const enviromentData = getEnvData();

type SheetContextState = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  enviromentData: any;
};

export const SheetContext = createContext<SheetContextState | undefined>(undefined);

export const SheetProvider = ({ children }) => {
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
