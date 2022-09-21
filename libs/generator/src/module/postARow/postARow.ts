import { GoogleSpreadsheet } from 'google-spreadsheet';

export const postARow = async (sheetDocument: GoogleSpreadsheet, data: Record<string, string>, sheetName: string) => {
  await sheetDocument.loadInfo();
  const sheet = sheetDocument.sheetsByTitle[sheetName];
  const resultRow = await sheet.addRow(data);
  return resultRow;
};
