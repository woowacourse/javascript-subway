import { getInputValidator, fetchEmailValidation } from '../../../utils/index.js';
import { AUTH_MESSAGES } from '../../../constants/index.js';

export const validateForm = ({ currentTarget }) => {
  const $button = currentTarget.submit;

  $button.disabled = !currentTarget.checkValidity();
};

export const validateName = getInputValidator(getNameValidityMessage);
export const validateEmail = getInputValidator(getEmailValidityMessage);
export const validatePassword = getInputValidator(getPasswordValidityMessage);

function getNameValidityMessage($input) {
  const { valueMissing } = $input.validity;

  if (valueMissing) {
    return AUTH_MESSAGES.USER_NAME_IS_REQUIRED;
  }
  return '';
}

async function getEmailValidityMessage($input) {
  const { valueMissing, typeMismatch } = $input.validity;
  const email = $input.value;

  if (valueMissing) {
    return AUTH_MESSAGES.USER_EMAIL_IS_REQUIRED;
  }

  if (typeMismatch) {
    return AUTH_MESSAGES.USER_EMAIL_TYPE_IS_MISMATCHED;
  }

  try {
    const response = await fetchEmailValidation(email);

    if (!response.ok) {
      return AUTH_MESSAGES.USER_EMAIL_IS_DUPLICATED;
    }
  } catch (error) {
    return error.message;
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
