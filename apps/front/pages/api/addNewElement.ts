import { NextApiRequest, NextApiResponse } from 'next';

const addNewElement = (req: NextApiRequest, res: NextApiResponse) => {
  const { body, method } = req;
  if (method !== 'POST') return res.status(403).json({ message: 'Not found', error: true });

  const parsedBody = JSON.parse(body);
  console.log(parsedBody);
};

export default addNewElement;
