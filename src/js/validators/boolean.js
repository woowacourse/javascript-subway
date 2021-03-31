import { ELEMENT, STANDARD_NUMBER, REG_EXP } from '../utils/constants';
import token from '../token/Token';
import { $$ } from '../utils/dom';

export const isInvalidEmailFormat = (email) => {
  return !REG_EXP.EMAIL.test(email);
};

export const isInvalidNameType = (userName) => {
  return !REG_EXP.NAME.test(userName);
};

export const isUnderPasswordMinLength = (password) => {
  return password.length < STANDARD_NUMBER.PASSWORD_MIN_LENGTH;
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

export const isDuplicatedLineColor = (selectedColor, colorList) => {
  return colorList.includes(selectedColor);
};

export const isInvalidLineNameType = (lineName) => {
  return !REG_EXP.LINE_NAME.test(lineName);
};

export const isDimmed = ($target) => {
  return $target.classList.contains('modal') && $target.classList.contains('open');
};
