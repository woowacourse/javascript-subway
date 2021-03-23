import { ELEMENT, STANDARD_NUMBER, REG_EXP } from '../utils/constants';
import token from '../token/Token';
import { $$ } from '../utils/dom';

export const isInvalidEmailFormat = (email) => {
  return !REG_EXP.EMAIL.test(email);
};

export const isInvalidUserNameType = (userName) => {
  return !REG_EXP.USER_NAME.test(userName);
};

export const isUnderPasswordMinLength = (password) => {
  return password.length < STANDARD_NUMBER.PASSWORD_MIN_LENGTH;
};

export const isDifferentPasswordAndPasswordConfirm = (password, passwordConfirm) => {
  return password !== passwordConfirm;
};

export const isRouterButton = (target) => {
  return target.matches(`.${ELEMENT.MAIN_MENU_ROUTER}`);
};

export const isSignIn = () => {
  return !!token.accessToken;
};

export const isAllSignUpInputSuccess = () => {
  return $$('.input-field.success').length === STANDARD_NUMBER.SIGN_UP_FORM_INPUT_COUNT;
};

export const isAllSignInInputSuccess = () => {
  return $$('.input-field.success').length === STANDARD_NUMBER.SIGN_IN_FORM_INPUT_COUNT;
};
