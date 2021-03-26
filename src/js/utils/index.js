import { $, $$ } from './DOM.js';
import getInputValidator from './getInputValidator.js';
import reportError from './reportError.js';
import { showSnackbar, showNotification } from './notify.js';
import mock from './mock.js';
import notify from './BOM.js';
import debounce from './debounce.js';
import { fetchEmailValidation, fetchSignUp, fetchLogin } from './fetch.js';
import { dispatchFormData, toStringFromFormData } from './form.js';

const hasPropertyValue = (obj, value) => {
  if (obj === null || typeof obj !== 'object') {
    throw new TypeError(
      `hasPropertyValue의 첫 번째 인자(${obj === null ? 'null' : typeof obj})는 'null'이 아닌 'object' 이어야 합니다.`
    );
  }

  return Object.values(obj).includes(value);
};

export {
  $,
  $$,
  getInputValidator,
  reportError,
  hasPropertyValue,
  mock,
  notify,
  debounce,
  showSnackbar,
  showNotification,
  fetchEmailValidation,
  fetchSignUp,
  fetchLogin,
  dispatchFormData,
  toStringFromFormData,
};
