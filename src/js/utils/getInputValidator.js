import reportError from './reportError.js';
import { AUTH_MESSAGES } from '../constants/index.js';

export default function getInputValidator(getValidityMessage) {
  try {
    if (typeof getValidityMessage !== 'function') {
      throw new TypeError('getInputValidator의 첫번째 인자는 function type이어야 합니다.');
    }

    return createInputValidator(getValidityMessage);
  } catch (error) {
    return () => handleError(error);
  }
}

function createInputValidator(getValidityMessage) {
  return async ({ target: $input }) => {
    try {
      if ($input === null || typeof $input !== 'object' || !($input instanceof HTMLInputElement)) {
        throw new TypeError('validate*의 첫번째 인자는 HTMLInputElement이어야 합니다.');
      }

      if ($input.validity.valid) {
        return;
      }

      const customValidityMessage = await getValidityMessage($input);

      $input.setCustomValidity(customValidityMessage);
      $input.reportValidity();
    } catch (error) {
      handleError(error);
    }
  };
}

function handleError(error) {
  reportError({
    messageToUser: AUTH_MESSAGES.INPUT_VALIDATION_HAS_BEEN_FAILED,
    messageToLog: error.message,
  });
}
