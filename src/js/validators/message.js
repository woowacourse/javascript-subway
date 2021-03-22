import { isValidEmail, isValidUserName, isValidPassword, isValidPasswordConfirm } from './validation';
import { ERROR_MESSAGE } from '../utils/constants';

export const getInvalidSignUpMessage = ({ email, userName, password, passwordConfirm }) => {
  if (!isValidEmail(email)) {
    throw new Error(ERROR_MESSAGE.INVALID_TYPE_EMAIL);
  }

  if (!isValidUserName(userName)) {
    throw new Error(ERROR_MESSAGE.INVALID_NAME);
  }

  if (!isValidPassword(password)) {
    throw new Error(ERROR_MESSAGE.NEED_OVER_PASSWORD_MIN_LENGTH);
  }

  if (!isValidPasswordConfirm(password, passwordConfirm)) {
    throw new Error(ERROR_MESSAGE.NOT_SAME_PASSWORD_AND_PASSWORD_CONFIRM);
  }
};
