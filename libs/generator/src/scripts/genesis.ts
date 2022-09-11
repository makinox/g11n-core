import { GoogleSpreadsheet } from 'google-spreadsheet';

import { writeJsonFile } from '../module/writeJsonFile/writeJsonFile';
import { getEnvData } from '../module/getEnvData/getEnvData';
import { readSheet } from '../module/readSheet/readSheet';

const evnviromentData = getEnvData();
const createSheetDocument = () => new GoogleSpreadsheet(evnviromentData.googleSheetId);
const sheetDocument = createSheetDocument();

sheetDocument
  .useServiceAccountAuth({
    client_email: evnviromentData.googleClientEmail,
    private_key: evnviromentData.googlePrivateKey,
  })
  .then(() => readSheet(sheetDocument))
  .then((data) => writeJsonFile(data))
  .catch((error) => {
    throw new Error(error);
  });
