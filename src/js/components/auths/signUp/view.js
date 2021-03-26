import { validateName, validateEmail, validatePassword, validateForm } from './validate.js';
import requestSignUp from './request.js';
import TEMPLATE from './template.js';
import { debounce, dispatchFormData } from '../../../utils/index.js';

const WAIT_TIME = 1500;

// eslint-disable-next-line import/prefer-default-export
export const renderSignUp = ($parent) => {
  $parent.innerHTML = TEMPLATE;

  const $form = $parent.querySelector('form');
  const $name = $parent.querySelector('#name');
  const $email = $parent.querySelector('#email');
  const $password = $parent.querySelector('#password');
  const $passwordCheckbox = $parent.querySelector('#password-checkbox');

  const handlePasswordCheckboxChange = ({ target }) => {
    $password.type = target.checked ? 'text' : 'password';
  };

  $name.addEventListener('input', validateName);
  $name.addEventListener('blur', validateName);

  $email.addEventListener('input', debounce(validateEmail, WAIT_TIME));
  $email.addEventListener('blur', validateEmail);

  $password.addEventListener('input', validatePassword);
  $password.addEventListener('blur', validatePassword);

  $passwordCheckbox.addEventListener('change', handlePasswordCheckboxChange);

  $form.addEventListener('input', validateForm);
  $form.addEventListener('submit', dispatchFormData);
  $form.addEventListener('formdata', requestSignUp);
};
