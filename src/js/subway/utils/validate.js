import { REG_EXP } from '../constants';

export const isValidEmail = value => REG_EXP.EMAIL.test(value);

// min, max default value 기준: VARCHAR()에서 저장 가능한 최대 문자열 길이.
export const isValidName = (value, minLength = 0, maxLength = 65535) => REG_EXP.NAME(minLength, maxLength).test(value);

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
};

export const isValidDistance = value => Number(value) > 0;

export const isValidDuration = value => Number(value) > 0;
