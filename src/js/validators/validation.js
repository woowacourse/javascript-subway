import {
  isInvalidEmailFormat,
  isInvalidNameType,
  isInvalidLineNameType,
  isUnderPasswordMinLength,
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
  if (password !== passwordConfirm) {
    throw new Error(ERROR_MESSAGE.DIFFERENT_PASSWORD_AND_PASSWORD_CONFIRM);
  }
};

export const validateAddLine = ({ lineName, upStationId, downStationId, selectedLineColor, lineColorList }) => {
  if (isInvalidLineNameType(lineName)) {
    throw new Error(ERROR_MESSAGE.INVALID_NAME_TYPE);
  }

  if (upStationId === downStationId) {
    throw new Error(ERROR_MESSAGE.NEED_DIFFERENT_UP_DOWN_STATION);
  }

  if (!selectedLineColor) {
    throw new Error(ERROR_MESSAGE.NEED_SELECT_COLOR);
  }

  if (isDuplicatedLineColor(selectedLineColor, lineColorList)) {
    throw new Error(ERROR_MESSAGE.DUPLICATED_LINE_COLOR);
  }
};

export const validateEditLine = ({ lineName, selectedLineColor, lineColorList }) => {
  if (isInvalidLineNameType(lineName)) {
    throw new Error(ERROR_MESSAGE.INVALID_NAME_TYPE);
  }

  if (selectedLineColor && isDuplicatedLineColor(selectedLineColor, lineColorList)) {
    throw new Error(ERROR_MESSAGE.DUPLICATED_LINE_COLOR);
  }
};
