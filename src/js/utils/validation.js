import { REGEXP } from '../constants';

export const isEmptyString = value => {
  return value.trim().length === 0;
};

export const isWrongEmailFormat = email => {
  return !REGEXP.EMAIL.test(email);
};
