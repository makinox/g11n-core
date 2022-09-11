import fs from 'fs';

import { SheetResult } from '../../types';
import { getEnvData } from '../getEnvData/getEnvData';

const evnviromentData = getEnvData();

export const writeJsonFile = (data: SheetResult) => {
  Object.keys(data).forEach((key) => {
    const tempObject = data[key];

    if (!fs.existsSync(evnviromentData.translationDir)) fs.mkdirSync(evnviromentData.translationDir, { recursive: true });

    fs.writeFileSync(`${evnviromentData.translationDir}/${key}.json`, JSON.stringify(tempObject, null, 2), { flag: 'wx' });
  });
};
