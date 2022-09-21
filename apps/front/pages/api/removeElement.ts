import { NextApiRequest, NextApiResponse } from 'next';
import { GeneralRestError } from '../../common/types';

const removeElement = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body, method } = req;
  if (method !== 'DELETE') return res.status(403).json({ message: 'Not found', error: true });
  const { deleteIndex } = JSON.parse(body);

  console.log({ deleteIndex });
  res.status(200).json({ deletedIndex: deleteIndex, error: false });
  // getInitializedSheet()
  //   .then(async (initializedSheet) => {
  //     const data = await postARrow(initializedSheet, formatToCreateNewRow, parsedBody.sheetName);
  //     const createdIndex = data.rowIndex;
  //     res.status(200).json({ createdIndex, error: false });
  //   })
  //   .catch(() => res.status(403).json({ message: 'Not found', error: true }));
};

export type removeElementType = {
  deletedIndex: number;
} & Pick<GeneralRestError, 'error'>;

export type removeElementResponse = removeElementType | GeneralRestError;

export default removeElement;
