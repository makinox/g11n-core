import React, { createContext, useEffect, useState } from 'react';

import { GetInitialDataResponse, GetInitialDataType } from '../../pages/api/getInitialData';
import { networkOrigin } from '../constants';

type SheetContextState = Partial<Pick<GetInitialDataType, 'languageKeys' | 'languageTuples' | 'sheetTitles'>> & {
  fetchAllData: () => Promise<void>;
};

const fetchSheetAccountData = async () => {
  const res = await fetch(`${networkOrigin}/api/getInitialData`);
  const data: GetInitialDataResponse = await res.json();

  if (res.status !== 200 && 'message' in data) new Error(data.message);
  return data as GetInitialDataType;
};

export const SheetContext = createContext<SheetContextState | undefined>(undefined);

export const SheetProvider = ({ children }) => {
  const [languageKeys, setLanguageKeys] = useState<GetInitialDataType['languageKeys']>([]);
  const [languageTuples, setLanguageTuples] = useState<GetInitialDataType['languageTuples']>({});
  const [sheetTitles, setSheetTitles] = useState<GetInitialDataType['sheetTitles']>([]);

  const fetchAllData = async () => {
    const { languageKeys, languageTuples, sheetTitles } = await fetchSheetAccountData();
    setLanguageKeys(languageKeys);
    setLanguageTuples(languageTuples);
    setSheetTitles(sheetTitles);
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return <SheetContext.Provider value={{ languageKeys, languageTuples, sheetTitles, fetchAllData }}>{children}</SheetContext.Provider>;
};

export const useSheet = () => {
  const context = React.useContext(SheetContext);
  if (context === undefined) {
    throw new Error('useSheet must be used within a SheetContext.Provider');
  }
  return context;
};
