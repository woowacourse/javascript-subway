import {
  ACTIONS,
  BASE_URL,
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
} from '../../constants';
import { request } from '../../utils/api';
import {
  isEmpty,
  isDifferent,
  isWrongEmailFormat,
} from '../../utils/validation';

export const checkNameValid = name => {
  if (isEmpty(name)) {
    return { isValid: false, message: ERROR_MESSAGE.EMPTY_NAME };
  }

  return { isValid: true, message: SUCCESS_MESSAGE.NAME };
};

export const checkEmailValid = async email => {
  try {
    if (isWrongEmailFormat(email)) {
      return { isValid: false, message: ERROR_MESSAGE.WRONG_EMAIL_FORMAT };
    }
    await request(`${BASE_URL}${ACTIONS.DUPLICATED_EMAIL}${email}`);
    return { isValid: true, message: SUCCESS_MESSAGE.EMAIL };
  } catch (error) {
    console.error(error);
    return { isValid: false, message: ERROR_MESSAGE.DUPLICATED_EMAIL };
  }
};

export const checkPasswordValid = password => {
  if (isEmpty(password)) {
    return { isValid: false, message: ERROR_MESSAGE.EMPTY_PASSWORD };
  }

  return { isValid: true, message: '올바른 비밀번호 입니다.' };
};

export const checkPasswordConfirmValid = (password, passwordConfirm) => {
  if (isEmpty(passwordConfirm)) {
    return { isValid: false, message: ERROR_MESSAGE.EMPTY_PASSWORD_CONFIRM };
  }
  if (isDifferent(password, passwordConfirm)) {
    return { isValid: false, message: ERROR_MESSAGE.DIFFERENT_PASSWORD };
  }

  return { isValid: true, message: SUCCESS_MESSAGE.PASSWORD_CONFIRM };
};
