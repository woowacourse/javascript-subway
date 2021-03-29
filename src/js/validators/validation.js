import {
  isInvalidEmailFormat,
  isInvalidNameType,
  isUnderPasswordMinLength,
  isDifferentPasswordAndPasswordConfirm,
  isDuplicatedLineColor,
} from './boolean';
import { ERROR_MESSAGE } from '../utils/constants';

export const validateEmail = (email) => {
  if (isInvalidEmailFormat(email)) {
    throw new Error(ERROR_MESSAGE.INVALID_EMAIL_FORMAT);
  }
};

export const validateName = (name) => {
  if (isInvalidNameType(name)) {
    throw new Error(ERROR_MESSAGE.INVALID_NAME_TYPE);
  }
};

export const validatePassword = (password) => {
  if (isUnderPasswordMinLength(password)) {
    throw new Error(ERROR_MESSAGE.NEED_OVER_PASSWORD_MIN_LENGTH);
  }
};

export const validatePasswordConfirm = (password, passwordConfirm) => {
  if (isDifferentPasswordAndPasswordConfirm(password, passwordConfirm)) {
    throw new Error(ERROR_MESSAGE.DIFFERENT_PASSWORD_AND_PASSWORD_CONFIRM);
  }
};

export const validateLineColor = (selectedColor, colorList) => {
  if (!selectedColor) {
    throw new Error('색을 선택해주세요.');
  }

  if (isDuplicatedLineColor(selectedColor, colorList)) {
    throw new Error('이미 같은 색의 노선이 존재합니다.');
  }
};
