import TEMPLATE from './template.js';
import { isLoggedIn } from '../../auth/index.js';
import { ROUTING_MESSAGES } from '../../constants/index.js';

// eslint-disable-next-line import/prefer-default-export
export const renderHome = ($parent) => {
  $parent.innerHTML = TEMPLATE;

  const $greetingMessage = $parent.querySelector('#greeting-message');

  $greetingMessage.innerText = isLoggedIn() ? ROUTING_MESSAGES.WELCOME : ROUTING_MESSAGES.LOGIN_IS_REQUIRED;
};
