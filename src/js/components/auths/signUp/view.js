import {
  updateValidationMessageOfName,
  updateValidationMessageOfEmail,
  updateValidationMessageOfPassword,
  updateSubmitButtonState,
} from './validate.js';
import requestSignUp from './request.js';
import TEMPLATE from './template.js';
import { show, debounce, dispatchFormData } from '../../../utils/index.js';

const WAIT_TIME = 500;

// eslint-disable-next-line import/prefer-default-export
export const renderSignUp = ($parent) => {
  $parent.innerHTML = TEMPLATE;

  const $form = $parent.querySelector('form');
  const $name = $parent.querySelector('#name');
  const $email = $parent.querySelector('#email');
  const $password = $parent.querySelector('#password');
  const $passwordCheckbox = $parent.querySelector('#password-checkbox');

  $name.focus();

  const $nameValidationMessage = $parent.querySelector('.name-validation-message');
  const $emailValidationMessage = $parent.querySelector('.email-validation-message');
  const $passwordValidationMessage = $parent.querySelector('.password-validation-message');

  const togglePasswordViewStyle = ({ target }) => {
    $password.type = target.checked ? 'text' : 'password';
  };

  $name.addEventListener('focus', () => show($nameValidationMessage), { once: true });
  $email.addEventListener('focus', () => show($emailValidationMessage), { once: true });
  $password.addEventListener('focus', () => show($passwordValidationMessage), { once: true });

  $name.addEventListener('input', updateValidationMessageOfName);
  $email.addEventListener('input', debounce(updateValidationMessageOfEmail, WAIT_TIME));
  $password.addEventListener('input', updateValidationMessageOfPassword);

  $passwordCheckbox.addEventListener('change', togglePasswordViewStyle);

  $form.addEventListener('input', updateSubmitButtonState);
  $form.addEventListener('submit', dispatchFormData);
  $form.addEventListener('formdata', requestSignUp);
};
