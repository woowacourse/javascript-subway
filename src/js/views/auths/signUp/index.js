import { validateName, validateEmail, validatePassword, validateForm } from './validate.js';
import requestSignUp from './request.js';
import TEMPLATE from './template.js';
import { $, debounce } from '../../../utils/index.js';

const $main = $('main');
const waitTime = 1500;

// eslint-disable-next-line import/prefer-default-export
export const renderSignUp = () => {
  $main.innerHTML = TEMPLATE;

  const $form = $main.querySelector('form');
  const $name = $main.querySelector('#name');
  const $email = $main.querySelector('#email');
  const $password = $main.querySelector('#password');

  $name.addEventListener('input', validateName);
  $name.addEventListener('blur', validateName);

  $email.addEventListener('input', debounce(validateEmail, waitTime));
  $email.addEventListener('blur', validateEmail);

  $password.addEventListener('input', validatePassword);
  $password.addEventListener('blur', validatePassword);

  $form.addEventListener('input', validateForm);
  $form.addEventListener('submit', requestSignUp);
};
