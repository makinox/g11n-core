import fs from 'fs';
import { translationDir } from '../../common/config/constants';
import { SheetResult } from '../../types';

export const writeJsonFile = (data: SheetResult) => {
  Object.keys(data).forEach((key) => {
    const tempObject = data[key];

    fs.writeFile(`${translationDir}/${key}.json`, JSON.stringify(tempObject, null, 2), (error: any) => {
      if (error) throw new Error(error);
    });
  });
};
