import { deleteARow, getInitializedSheet } from '@g11n-core/generator';
import { NextApiRequest, NextApiResponse } from 'next';

import { errorMessages } from '../../common/constants';
import { GeneralRestError } from '../../common/types';

const removeElement = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body, method } = req;
  if (method !== 'DELETE') return res.status(403).json({ message: errorMessages.NOT_FOUND, error: true });

  const { deleteIndex, sheetTitle } = JSON.parse(body);

  getInitializedSheet()
    .then(async (initializedSheet) => {
      const data = await deleteARow(initializedSheet, deleteIndex, sheetTitle);
      console.log({ data });
      res.status(200).json({ deletedIndex: deleteIndex, error: false });
    })
    .catch(() => res.status(403).json({ message: errorMessages.NOT_FOUND, error: true }));
};

export type removeElementType = {
  deletedIndex: number;
} & Pick<GeneralRestError, 'error'>;

export type removeElementResponse = removeElementType | GeneralRestError;

export default removeElement;
