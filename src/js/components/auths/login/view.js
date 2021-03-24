import { validateEmail, validatePassword, validateForm } from './validate.js';
import TEMPLATE from './template.js';
import requestLogin from './request.js';

// eslint-disable-next-line import/prefer-default-export
export const renderLogin = ($parent) => {
  $parent.innerHTML = TEMPLATE;

  const $form = $parent.querySelector('form');
  const $email = $parent.querySelector('#email');
  const $password = $parent.querySelector('#password');

  $email.addEventListener('input', validateEmail);
  $email.addEventListener('blur', validateEmail);

  $password.addEventListener('input', validatePassword);
  $password.addEventListener('blur', validatePassword);

  $form.addEventListener('input', validateForm);
  $form.addEventListener('submit', requestLogin);
};
