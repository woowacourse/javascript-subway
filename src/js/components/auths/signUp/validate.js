import { fetchEmailValidation } from '../../../utils/index.js';
import { AUTH_MESSAGES } from '../../../constants/index.js';

export const updateSubmitButtonState = ({ currentTarget }) => {
  const $button = currentTarget.submit;

  $button.disabled = !currentTarget.checkValidity();
};

export const updateValidationMessageOfName = ({ target }) => {
  const message = getValidationMessageOfName(target);
  const $message = target.form.querySelector('.name-validation-message');

  $message.innerText = message;
};

export const updateValidationMessageOfEmail = async ({ target }) => {
  const message = await getValidationMessageOfEmail(target);
  const $message = target.form.querySelector('.email-validation-message');

  $message.innerText = message;
  target.setCustomValidity(message === AUTH_MESSAGES.USER_EMAIL_IS_DUPLICATED ? message : '');
  target.checkValidity();
};

export const updateValidationMessageOfPassword = ({ target }) => {
  const message = getValidationMessageOfPassword(target);
  const $message = target.form.querySelector('.password-validation-message');

  $message.innerText = message;
};

function getValidationMessageOfName($input) {
  const { valueMissing } = $input.validity;

  if (valueMissing) {
    return AUTH_MESSAGES.USER_NAME_IS_REQUIRED;
  }

  return AUTH_MESSAGES.USER_NAME_IS_AVAILABLE;
}

async function getValidationMessageOfEmail($input) {
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

  return AUTH_MESSAGES.USER_EMAIL_IS_AVAILABLE;
}

function getValidationMessageOfPassword($input) {
  const { valueMissing } = $input.validity;
  if (valueMissing) {
    return AUTH_MESSAGES.USER_PASSWORD_IS_REQUIRED;
  }

  return AUTH_MESSAGES.USER_PASSWORD_IS_AVAILABLE;
}
