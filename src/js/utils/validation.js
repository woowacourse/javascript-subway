import { REGEXP } from '../constants';

export const isEmptyString = value => {
  return value.trim().length === 0;
};

export const isValidEmailFormat = email => {
  return REGEXP.EMAIL.test(email);
};

export const isInRange = (
  value,
  { min = 0, max = Number.MAX_SAFE_INTEGER },
) => {
  return min <= value && value <= max;
};
