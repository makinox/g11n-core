import { GoogleSpreadsheet } from 'google-spreadsheet';

import { getEnvData } from '../getEnvData/getEnvData';
import { SheetResult } from '../../types';

const evnviromentData = getEnvData();

export const getSheetTitles = () =>
  evnviromentData.sheetArgument === 'All' ? evnviromentData.googleSheetDefaultTitles : [evnviromentData.sheetArgument];

export const readSheet = async (sheetDocument: GoogleSpreadsheet) => {
  await sheetDocument.loadInfo();
  const languageTuples: SheetResult = {};
  const sheetTitles = getSheetTitles();
  const languageKeys: Array<string[]> = [];

  for await (const title of sheetTitles) {
    const sheet = sheetDocument.sheetsByTitle[title];
    await sheet.loadHeaderRow();

    const columnTitles = sheet.headerValues;
    const sheetRows = await sheet.getRows({ limit: sheet.rowCount, offset: 0 });
    const currentLanguagueKeys = columnTitles.slice(1);
    languageKeys.push(currentLanguagueKeys);

    currentLanguagueKeys.forEach((langKey) => {
      const tupleRef = languageTuples[langKey];
      if (!tupleRef) Object.defineProperty(languageTuples, langKey, { enumerable: true, writable: true, value: {} });
    });

    sheetRows.map((row) => {
      currentLanguagueKeys.forEach((langKey) => {
        const translationKey = row[columnTitles[0]];
        const rowValue = row[langKey] || undefined;
        Object.defineProperty(languageTuples[langKey], translationKey, {
          value: rowValue,
          enumerable: true,
          writable: true,
        });
      });
    });
  }

  return { languageTuples, languageKeys };
};
