import { GoogleSpreadsheet } from 'google-spreadsheet';

export const deleteARow = async (sheetDocument: GoogleSpreadsheet, deleteIndex: number, sheetName: string) => {
  await sheetDocument.loadInfo();
  const sheet = sheetDocument.sheetsByTitle[sheetName];
  const rows = await sheet.getRows();
  return rows[deleteIndex].delete();
};
