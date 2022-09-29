import { GoogleSpreadsheet } from 'google-spreadsheet';

import { getEnvData } from '../getEnvData/getEnvData';
import { SheetResult } from '../../types';

const evnviromentData = getEnvData();

export const getSheetTitles = () =>
  evnviromentData.sheetArgument === 'All' ? evnviromentData.googleSheetDefaultTitles : [evnviromentData.sheetArgument];

export const readSheet = async (sheetDocument: GoogleSpreadsheet) => {
  await sheetDocument.loadInfo();

  const languageTuplesFormatted: SheetResult = {};
  const languageKeys: Array<Array<string>> = [];
  const languageTuples: SheetResult = {};
  const sheetTitles = getSheetTitles();

  for await (const title of sheetTitles) {
    const sheet = sheetDocument.sheetsByTitle[title];
    await sheet.loadHeaderRow();

    const columnTitles = sheet.headerValues;
    const sheetRows = await sheet.getRows({ limit: sheet.rowCount, offset: 0 });
    const currentLanguagueKeys = columnTitles.slice(1);
    languageKeys.push(currentLanguagueKeys);

    currentLanguagueKeys.forEach((langKey) => {
      const tupleRef = languageTuples[langKey];
      if (tupleRef) return;

      Object.defineProperty(languageTuples, langKey, { enumerable: true, writable: true, value: {} });
      Object.defineProperty(languageTuplesFormatted, langKey, { enumerable: true, writable: true, value: {} });
    });

    sheetRows.map((row) => {
      currentLanguagueKeys.forEach((langKey) => {
        const translationKey = row[columnTitles[0]];
        const translationKeyFormatted = `${row[columnTitles[0]]}&${title}`;
        const rowValue = row[langKey] || undefined;

        Object.defineProperty(languageTuples[langKey], translationKey, {
          value: rowValue,
          enumerable: true,
          writable: true,
        });

        Object.defineProperty(languageTuplesFormatted[langKey], translationKeyFormatted, {
          value: rowValue,
          enumerable: true,
          writable: true,
        });
      });
    });
  }

  return { languageTuples, languageKeys, languageTuplesFormatted };
};
