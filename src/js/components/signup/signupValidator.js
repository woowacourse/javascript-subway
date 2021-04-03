import { authAPI } from '../../../../api/auth';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../../constants';
import { isEmptyString, isValidEmailFormat } from '../../utils/validation';

export const checkNameValid = name => {
  if (isEmptyString(name)) {
    return { isValid: false, message: ERROR_MESSAGE.EMPTY_NAME };
  }

  return { isValid: true, message: SUCCESS_MESSAGE.NAME };
};

export const checkEmailValid = async email => {
  try {
    if (!isValidEmailFormat(email)) {
      return { isValid: false, message: ERROR_MESSAGE.WRONG_EMAIL_FORMAT };
    }

    await authAPI.checkDuplicatedEmail(email);

    return { isValid: true, message: SUCCESS_MESSAGE.EMAIL };
  } catch {
    return { isValid: false, message: ERROR_MESSAGE.DUPLICATED_EMAIL };
  }
};

export const checkPasswordValid = password => {
  if (isEmptyString(password)) {
    return { isValid: false, message: ERROR_MESSAGE.EMPTY_PASSWORD };
  }

  return { isValid: true, message: SUCCESS_MESSAGE.PASSWORD };
};

export const checkPasswordConfirmValid = (password, passwordConfirm) => {
  if (isEmptyString(passwordConfirm)) {
    return { isValid: false, message: ERROR_MESSAGE.EMPTY_PASSWORD_CONFIRM };
  }
  if (password !== passwordConfirm) {
    return { isValid: false, message: ERROR_MESSAGE.DIFFERENT_PASSWORD };
  }

  return { isValid: true, message: SUCCESS_MESSAGE.PASSWORD_CONFIRM };
};
