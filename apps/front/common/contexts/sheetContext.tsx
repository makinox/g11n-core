import React, { createContext, useEffect, useState } from 'react';

import { GetInitialDataResponse, GetInitialDataType } from '../../pages/api/getInitialData';

type SheetContextState = Partial<Pick<GetInitialDataType, 'languageKeys' | 'languageTuples' | 'sheetTitles'>>;

const fetchSheetAccountData = async () => {
  const res = await fetch('api/getInitialData');
  const data: GetInitialDataResponse = await res.json();

  if (res.status !== 200 && 'message' in data) {
    throw new Error(data.message);
  }
  return data as GetInitialDataType;
};

export const SheetContext = createContext<SheetContextState | undefined>(undefined);

export const SheetProvider = ({ children }) => {
  const [languageKeys, setLanguageKeys] = useState<GetInitialDataType['languageKeys']>([]);
  const [languageTuples, setLanguageTuples] = useState<GetInitialDataType['languageTuples']>({});
  const [sheetTitles, setSheetTitles] = useState<GetInitialDataType['sheetTitles']>([]);

  useEffect(() => {
    fetchSheetAccountData().then(({ languageKeys, languageTuples, sheetTitles }) => {
      setLanguageKeys(languageKeys);
      setLanguageTuples(languageTuples);
      setSheetTitles(sheetTitles);
    });
  }, []);

  return <SheetContext.Provider value={{ languageKeys, languageTuples, sheetTitles }}>{children}</SheetContext.Provider>;
};

export const useSheet = () => {
  const context = React.useContext(SheetContext);
  if (context === undefined) {
    throw new Error('useSheet must be used within a SheetContext.Provider');
  }
  return context;
};
