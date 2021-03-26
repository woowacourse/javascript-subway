import { REGEXP } from '../constants';

export const isEmptyString = value => {
  return value.trim().length === 0;
};

export const isValidEmailFormat = email => {
  return REGEXP.EMAIL.test(email);
};
