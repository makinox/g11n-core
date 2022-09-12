import { getInitializedSheet } from '@g11n-core/generator';

export default function handler(req, res) {
  getInitializedSheet().then(async (initializedSheet) => {
    await initializedSheet.loadInfo();
    const doc = initializedSheet.sheetsByTitle['Main'];
    console.log({ doc });
  });
  res.status(200).json({ name: 'John Doe' });
}
