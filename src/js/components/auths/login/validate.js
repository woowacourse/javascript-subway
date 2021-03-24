import { generateInputValidator } from '../../../utils/index.js';
import { AUTH_MESSAGES } from '../../../constants/index.js';

const getEmailValidityMessage = async ($input) => {
  const { valueMissing, typeMismatch } = $input.validity;

  if (valueMissing) {
    return AUTH_MESSAGES.USER_EMAIL_IS_REQUIRED;
  }

  if (typeMismatch) {
    return AUTH_MESSAGES.USER_EMAIL_TYPE_IS_MISMATCHED;
  }

  return '';
};

const getPasswordValidityMessage = ($input) => {
  const { valueMissing } = $input.validity;
  if (valueMissing) {
    return AUTH_MESSAGES.USER_PASSWORD_IS_REQUIRED;
  }

  return '';
};

export const validateEmail = generateInputValidator(getEmailValidityMessage);
export const validatePassword = generateInputValidator(getPasswordValidityMessage);

export const validateForm = ({ currentTarget }) => {
  const $button = currentTarget.elements.submit;

  $button.disabled = !currentTarget.checkValidity();
};
