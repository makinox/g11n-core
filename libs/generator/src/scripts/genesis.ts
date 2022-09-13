import { getInitializedSheet } from '../module/getInitializedSheet/getInitializedSheet';
import { writeJsonFile } from '../module/writeJsonFile/writeJsonFile';
import { readSheet } from '../module/readSheet/readSheet';

const initializedSheet = getInitializedSheet();

initializedSheet
  .then((sheetDocument) => readSheet(sheetDocument))
  .then(({ languageTuples }) => writeJsonFile(languageTuples))
  .catch((error) => {
    throw new Error(error);
  });
