import { GoogleSpreadsheet } from 'google-spreadsheet';

import { getEnvData } from '../getEnvData/getEnvData';
import { SheetResult } from '../../types';

const evnviromentData = getEnvData();

export const readSheet = async (sheetDocument: GoogleSpreadsheet) => {
  await sheetDocument.loadInfo();
  const languageTuples: SheetResult = {};
  const sheetTitles = evnviromentData.sheetArgument === 'All' ? ['Main'] : [evnviromentData.sheetArgument];

  for await (const title of sheetTitles) {
    const sheet = sheetDocument.sheetsByTitle[title];
    await sheet.loadHeaderRow();
    const columnTitles = sheet.headerValues;
    const sheetRows = await sheet.getRows({ limit: sheet.rowCount, offset: 0 });
    const languageKeys = columnTitles.slice(1);

    languageKeys.forEach((langKey) => Object.defineProperty(languageTuples, langKey, { enumerable: true, writable: true, value: {} }));

    sheetRows.map((row) => {
      languageKeys.forEach((langKey) => {
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

  return languageTuples;
};
