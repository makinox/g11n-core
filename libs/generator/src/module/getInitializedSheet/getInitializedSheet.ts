import { GoogleSpreadsheet } from 'google-spreadsheet';
import { getEnvData } from '../getEnvData/getEnvData';

const evnviromentData = getEnvData();
const createSheetDocument = () => new GoogleSpreadsheet(evnviromentData.googleSheetId);
const sheetDocument = createSheetDocument();

export const getInitializedSheet = (): Promise<GoogleSpreadsheet> => {
  return sheetDocument
    .useServiceAccountAuth({
      client_email: evnviromentData.googleClientEmail,
      private_key: evnviromentData.googlePrivateKey,
    })
    .then(() => sheetDocument)
    .catch((error) => {
      throw new Error(error);
    });
};
