import { errorMessages } from './constants';

export type GeneralRestError = {
  message: errorMessages;
  error: boolean;
};
