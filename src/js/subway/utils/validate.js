import { REG_EXP } from '../constants/constants';

export const isValidEmail = value => REG_EXP.EMAIL.test(value);

export const isValidName = value => REG_EXP.NAME.test(value);

export const isValidPassword = value => REG_EXP.PASSWORD.test(value);

export const findInValidInput = $$input => {
  if (!isValidEmail($$input.$email.value)) {
    return $$input.$email;
  }
  if (!isValidName($$input.$name.value)) {
    return $$input.$name;
  }
  if (!isValidPassword($$input.$password.value)) {
    return $$input.$password;
  }
  if ($$input.$password.value !== $$input.$passwordConfirm.value) {
    return $$input.$passwordConfirm;
  }
  return '';
};
