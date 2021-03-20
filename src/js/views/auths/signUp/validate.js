import { generateInputValidator } from '../../../utils/index.js';
import { AUTH_MESSAGES } from '../../../constants/index.js';

const getNameValidityMessage = ({ valueMissing }) => {
  if (valueMissing) {
    return AUTH_MESSAGES.USER_NAME_IS_REQUIRED;
  }
  return '';
};

const getEmailValidityMessage = ({ valueMissing, typeMismatch }) => {
  if (valueMissing) {
    return AUTH_MESSAGES.USER_EMAIL_IS_REQUIRED;
  }

  if (typeMismatch) {
    return AUTH_MESSAGES.USER_EMAIL_TYPE_IS_MISMATCHED;
  }

  // TODO: 이메일 중복되었는지 API 호출 필요
  const response = { ok: true };
  if (!response.ok) {
    return AUTH_MESSAGES.USER_EMAIL_IS_DUPLICATED;
  }

  return '';
};

const getPasswordValidityMessage = ({ valueMissing }) => {
  if (valueMissing) {
    return AUTH_MESSAGES.USER_PASSWORD_IS_REQUIRED;
  }

  return '';
};

export const validateName = generateInputValidator(getNameValidityMessage);
export const validateEmail = generateInputValidator(getEmailValidityMessage);
export const validatePassword = generateInputValidator(getPasswordValidityMessage);

export const validateForm = ({ currentTarget }) => {
  const $button = currentTarget.elements.submit;

  $button.disabled = !currentTarget.checkValidity();
};
