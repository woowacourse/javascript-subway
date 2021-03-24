import { generateInputValidator } from '../../../utils/index.js';
import { API_ENDPOINT, AUTH_MESSAGES } from '../../../constants/index.js';

const getNameValidityMessage = ($input) => {
  const { valueMissing } = $input.validity;

  if (valueMissing) {
    return AUTH_MESSAGES.USER_NAME_IS_REQUIRED;
  }
  return '';
};

const getEmailValidityMessage = async ($input) => {
  const { valueMissing, typeMismatch } = $input.validity;
  const email = $input.value;

  if (valueMissing) {
    return AUTH_MESSAGES.USER_EMAIL_IS_REQUIRED;
  }

  if (typeMismatch) {
    return AUTH_MESSAGES.USER_EMAIL_TYPE_IS_MISMATCHED;
  }

  try {
    const url = new URL(API_ENDPOINT.EMAIL_VALIDATION);
    const parameters = new URLSearchParams({ email });
    url.search = parameters.toString();

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });

    if (!response.ok) {
      return AUTH_MESSAGES.USER_EMAIL_IS_DUPLICATED;
    }
  } catch (error) {
    return error.message;
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

export const validateName = generateInputValidator(getNameValidityMessage);
export const validateEmail = generateInputValidator(getEmailValidityMessage);
export const validatePassword = generateInputValidator(getPasswordValidityMessage);

export const validateForm = ({ currentTarget }) => {
  const $button = currentTarget.elements.submit;

  $button.disabled = !currentTarget.checkValidity();
};
