import TEMPLATE from './template.js';
import { isLoggedIn } from '../../../auth/index.js';
import { PATHNAMES } from '../../../constants/index.js';

const textLogin = '👤 로그인';
const textLogout = '👤 로그아웃';

// eslint-disable-next-line import/prefer-default-export
export const renderHeader = ($parent) => {
  $parent.innerHTML = TEMPLATE;

  const $login = $parent.querySelector('#login');
  const $button = $login.querySelector('button');

  $login.href = isLoggedIn() ? PATHNAMES.LOGOUT : PATHNAMES.LOGIN;
  $button.innerText = isLoggedIn() ? textLogout : textLogin;
};
