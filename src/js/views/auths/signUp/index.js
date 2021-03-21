import { validateName, validateEmail, validatePassword, validateForm } from './validate.js';
import requestSignUp from './request.js';
import TEMPLATE from './template.js';
import { debounce } from '../../../utils/index.js';

const waitTime = 1500;

// eslint-disable-next-line import/prefer-default-export
export const renderSignUp = ($parent) => {
  $parent.innerHTML = TEMPLATE;

  const $form = $parent.querySelector('form');
  const $name = $parent.querySelector('#name');
  const $email = $parent.querySelector('#email');
  const $password = $parent.querySelector('#password');

  $name.addEventListener('input', validateName);
  $name.addEventListener('blur', validateName);

  $email.addEventListener('input', debounce(validateEmail, waitTime));
  $email.addEventListener('blur', validateEmail);

  $password.addEventListener('input', validatePassword);
  $password.addEventListener('blur', validatePassword);

  $form.addEventListener('input', validateForm);
  $form.addEventListener('submit', requestSignUp);
};
