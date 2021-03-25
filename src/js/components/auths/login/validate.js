import { getInputValidator } from '../../../utils/index.js';
import { AUTH_MESSAGES } from '../../../constants/index.js';

export const validateForm = ({ currentTarget }) => {
  const $button = currentTarget.submit;

  $button.disabled = !currentTarget.checkValidity();
};

export const validateEmail = getInputValidator(getEmailValidityMessage);
export const validatePassword = getInputValidator(getPasswordValidityMessage);

function getEmailValidityMessage($input) {
  const { valueMissing, typeMismatch } = $input.validity;

  if (valueMissing) {
    return AUTH_MESSAGES.USER_EMAIL_IS_REQUIRED;
  }

  if (typeMismatch) {
    return AUTH_MESSAGES.USER_EMAIL_TYPE_IS_MISMATCHED;
  }

  return '';
}

function getPasswordValidityMessage($input) {
  const { valueMissing } = $input.validity;
  if (valueMissing) {
    return AUTH_MESSAGES.USER_PASSWORD_IS_REQUIRED;
  }

  return '';
}
