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

  const $form = $parent.querySelector('.sign-up-form');
  const $name = $form.elements.name;
  const $email = $form.elements.email;
  const $password = $form.elements.password;
  const $passwordCheckbox = $form.elements['password-checkbox'];

  $name.focus();

  const $nameValidationMessage = $form.querySelector('.name-validation-message');
  const $emailValidationMessage = $form.querySelector('.email-validation-message');
  const $passwordValidationMessage = $form.querySelector('.password-validation-message');

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
