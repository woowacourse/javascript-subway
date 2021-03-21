import { validateEmail, validatePassword, validateForm } from './validate.js';
import TEMPLATE from './template.js';
import requestLogin from './request.js';
import { $ } from '../../../utils/index.js';

const $main = $('main');

// eslint-disable-next-line import/prefer-default-export
export const renderLogin = () => {
  $main.innerHTML = TEMPLATE;

  const $form = $main.querySelector('form');
  const $email = $main.querySelector('#email');
  const $password = $main.querySelector('#password');

  $email.addEventListener('input', validateEmail);
  $email.addEventListener('blur', validateEmail);

  $password.addEventListener('input', validatePassword);
  $password.addEventListener('blur', validatePassword);

  $form.addEventListener('input', validateForm);
  $form.addEventListener('submit', requestLogin);
};
