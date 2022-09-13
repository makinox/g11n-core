/* eslint-disable @typescript-eslint/no-explicit-any */
import configEnvs from '../../../g11n.config';

const getSheetTitle = (): string => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const maskedProcess: any = process;
  const sheetArgument = maskedProcess.argv.filter((argument: any) => argument.includes('--sheet='))[0] as any;
  const sheetName = sheetArgument?.split('=')[1] || 'All';
  return sheetName;
};

export const getEnvData = () => {
  const sheetArgument = getSheetTitle();
  const translationDir = configEnvs.TRANSLATION_DIR;
  const googleSheetId = configEnvs.GOOGLE_SHEET_ID;
  const googleSheetDefaultTitles = configEnvs.GOOGLE_SHEET_DEFAULT_TITLES;
  const googleClientEmail = configEnvs.GOOGLE_CLIENT_EMAIL;
  const googlePrivateKey = configEnvs.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n') as string;

  const aVariableIsMissing = [googleSheetId, googleClientEmail, googlePrivateKey, translationDir].some((variable) => variable === undefined);
  if (aVariableIsMissing) throw new Error('One or more variables are missing');

  return {
    sheetArgument,
    googleSheetId,
    translationDir,
    googlePrivateKey,
    googleClientEmail,
    googleSheetDefaultTitles,
  };
};
