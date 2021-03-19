import { REG_EXP } from '../constants/constants';

export const isValidEmail = input => {
  return REG_EXP.EMAIL.test(input);
};
export const isValidName = input => {
  return REG_EXP.NAME.test(input);
};
export const isValidPassword = input => {
  return REG_EXP.PASSWORD.test(input);
};
