import { getEnvData, getInitializedSheet, readSheet } from '@g11n-core/generator';

export default function handler(_, res) {
  getInitializedSheet()
    .then(async (initializedSheet) => {
      const evnviromentData = getEnvData();
      const sheetTitles = evnviromentData.googleSheetDefaultTitles;
      const { languageKeys, languageTuples } = await readSheet(initializedSheet);

      res.status(200).json({ evnviromentData, sheetTitles, languageKeys, languageTuples });
    })
    .catch(() => res.status(403).json({ message: 'Not found', error: true }));
}
