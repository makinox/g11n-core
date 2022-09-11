import { EviromentVariables } from '../../common/config/constants';

const getSheetTitle = (): string => {
  const sheetArgument = process.argv.filter((argument) => argument.includes('--sheet='))[0];
  const sheetName = sheetArgument?.split('=')[1] || 'All';
  return sheetName;
};

export const getEnvData = () => {
  const sheetArgument = getSheetTitle();
  const googleSheetId = process.env[EviromentVariables.GOOGLE_SHEET_ID] as string;
  const googleClientEmail = process.env[EviromentVariables.GOOGLE_CLIENT_EMAIL] as string;
  const googlePrivateKey = process.env[EviromentVariables.GOOGLE_PRIVATE_KEY]?.replace(/\\n/g, '\n') as string;

  const aVariableIsMissing = [googleSheetId, googleClientEmail, googlePrivateKey].some((variable) => variable === undefined);
  if (aVariableIsMissing) throw new Error('One or more variables are missing');

  return {
    sheetArgument,
    googleSheetId,
    googleClientEmail,
    googlePrivateKey,
  };
};
