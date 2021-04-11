import debounce from './debounce.js';
import reportError from './reportError.js';
import { $, $$, show, hide } from './DOM.js';
import { GET, POST, DELETE, PUT } from './fetch.js';
import { showSnackbar, showNotification } from './notify.js';
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
  debounce,
  dispatchFormData,
  hasPropertyValue,
  hide,
  reportError,
  show,
  showSnackbar,
  showNotification,
  toStringFromFormData,
  GET,
  POST,
  DELETE,
  PUT,
};
