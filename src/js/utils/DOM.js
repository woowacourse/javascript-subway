export const $ = (selector) => document.querySelector(selector);

export const $$ = (selector) => document.querySelectorAll(selector);

export const generateInputValidator = (getValidityMessage) => {
  if (typeof getValidityMessage !== 'function') {
    throw new TypeError('generateInputValidator의 첫번째 인자는 function type이어야 합니다.');
  }

  return async function validate({ target: $input }) {
    if ($input === null || typeof $input !== 'object' || !($input instanceof HTMLInputElement)) {
      throw new TypeError('validate*의 첫번째 인자는 HTMLInputElement이어야 합니다.');
    }

    if ($input.validity.valid) {
      return;
    }

    const customValidityMessage = await getValidityMessage($input);

    $input.setCustomValidity(customValidityMessage);
    $input.reportValidity();
  };
};
