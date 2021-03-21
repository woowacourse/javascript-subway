import { $, $$, generateInputValidator } from './DOM.js';
import mock from './mock.js';
import notify from './BOM.js';
import debounce from './debounce.js';

const hasPropertyValue = (obj, value) => {
  if (obj === null) {
    throw TypeError(`첫 번째 인자(${obj})는 'null'이 아니어야 합니다.`);
  }

  if (typeof obj !== 'object') {
    throw TypeError(`첫 번째 인자(${obj})의 타입(${typeof obj})은 'object' 이어야 합니다.`);
  }

  return Object.values(obj).includes(value);
};

export { $, $$, generateInputValidator, hasPropertyValue, mock, notify, debounce };
