import { $, $$ } from './DOM.js';
import mock from './mock.js';

const hasPropertyValue = (obj, value) => {
  if (obj === null) {
    throw TypeError(`첫 번째 인자(${obj})는 'null'이 아니어야 합니다.`);
  }

  if (typeof obj !== 'object') {
    throw TypeError(`첫 번째 인자(${obj})의 타입(${typeof obj})은 'object' 이어야 합니다.`);
  }

  Object.values(obj).includes(value);
};

export { $, $$, hasPropertyValue, mock };
