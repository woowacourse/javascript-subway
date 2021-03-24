import TEMPLATE from './template.js';
import { isLoggedIn } from '../../auth/index.js';
import { AUTH_MESSAGES } from '../../constants/index.js';

// eslint-disable-next-line import/prefer-default-export
export const renderHome = ($parent) => {
  $parent.innerHTML = TEMPLATE;

  const $greetingMessage = $parent.querySelector('#greeting-message');

  $greetingMessage.innerText = isLoggedIn() ? AUTH_MESSAGES.WELCOME : AUTH_MESSAGES.LOGIN_IS_REQUIRED;
};
