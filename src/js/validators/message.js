import { isValidEmail, isValidUserName, isValidPassword, isValidPasswordConfirm } from './validation.js';
import { ERROR_MESSAGE } from '../utils/constants.js';

export const getInvalidSignUpMessage = ({ email, userName, password, passwordConfirm }) => {
  if (!isValidEmail(email)) {
    return ERROR_MESSAGE.INVALID_TYPE_EMAIL;
  }

  if (!isValidUserName(userName)) {
    return ERROR_MESSAGE.INVALID_NAME;
  }

  if (!isValidPassword(password)) {
    return ERROR_MESSAGE.NEED_OVER_PASSWORD_MIN_LENGTH;
  }

  if (!isValidPasswordConfirm(password, passwordConfirm)) {
    return ERROR_MESSAGE.NOT_SAME_PASSWORD_AND_PASSWORD_CONFIRM;
  }

  return '';
};
