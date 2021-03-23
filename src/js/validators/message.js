import {
  isInvalidEmailFormat,
  isInvalidUserNameType,
  isUnderPasswordMinLength,
  isDifferentPasswordAndPasswordConfirm,
} from './validation';
import { ERROR_MESSAGE } from '../utils/constants';

export const getInvalidSignUpMessage = ({ email, userName, password, passwordConfirm }) => {
  if (isInvalidEmailFormat(email)) {
    throw new Error(ERROR_MESSAGE.INVALID_EMAIL_FORMAT);
  }

  if (isInvalidUserNameType(userName)) {
    throw new Error(ERROR_MESSAGE.INVALID_USER_NAME_TYPE);
  }

  if (isUnderPasswordMinLength(password)) {
    throw new Error(ERROR_MESSAGE.NEED_OVER_PASSWORD_MIN_LENGTH);
  }

  if (isDifferentPasswordAndPasswordConfirm(password, passwordConfirm)) {
    throw new Error(ERROR_MESSAGE.DIFFERENT_PASSWORD_AND_PASSWORD_CONFIRM);
  }
};

export const getEmailValidationMessage = (email) => {
  if (isInvalidEmailFormat(email)) {
    throw new Error(ERROR_MESSAGE.INVALID_EMAIL_FORMAT);
  }
};
