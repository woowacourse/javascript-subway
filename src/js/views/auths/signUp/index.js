import TEMPLATE from './template.js';
import { $ } from '../../../utils/index.js';
import { validateName, validateEmail, validatePassword } from './validate.js';

const $main = $('main');

// eslint-disable-next-line import/prefer-default-export
export const renderSignUp = () => {
  $main.innerHTML = TEMPLATE;

  const $name = $main.querySelector('#name');
  const $email = $main.querySelector('#email');
  const $password = $main.querySelector('#password');

  $name.addEventListener('input', validateName);
  $name.addEventListener('blur', validateName);

  $email.addEventListener('input', validateEmail);
  $email.addEventListener('blur', validateEmail);

  $password.addEventListener('input', validatePassword);
  $password.addEventListener('blur', validatePassword);
};
