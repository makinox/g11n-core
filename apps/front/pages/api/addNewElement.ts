import { getInitializedSheet, postARow } from '@g11n-core/generator';
import { NextApiRequest, NextApiResponse } from 'next';

import { GeneralRestError } from '../../common/types';

const formatKey = (element: string) => {
  if (element === 'keyName') return 'key';
  if (element.includes('keyValue')) return element.split('%')[1];
  return undefined;
};

const addNewElement = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body, method } = req;
  if (method !== 'POST') return res.status(403).json({ message: 'Not found', error: true });

  const parsedBody: Record<string, string> = JSON.parse(body);
  const formatToCreateNewRow = {
    key: parsedBody.keyName,
  };
  Object.keys(parsedBody).map((element) => {
    const formatedKey = formatKey(element);
    if (formatedKey) Object.defineProperty(formatToCreateNewRow, formatedKey, { enumerable: true, writable: true, value: parsedBody[element] });
  });

  getInitializedSheet()
    .then(async (initializedSheet) => {
      const data = await postARow(initializedSheet, formatToCreateNewRow, parsedBody.sheetName);
      const createdIndex = data.rowIndex;
      res.status(200).json({ createdIndex, error: false });
    })
    .catch(() => res.status(403).json({ message: 'Not found', error: true }));
};

export type addNewElementType = {
  createdIndex: number;
} & Pick<GeneralRestError, 'error'>;

export type addNewElementResponse = addNewElementType | GeneralRestError;

export default addNewElement;
