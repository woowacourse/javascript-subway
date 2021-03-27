import updateSubmitButtonState from './validate.js';
import TEMPLATE from './template.js';
import requestLogin from './request.js';
import { dispatchFormData } from '../../../utils/index.js';

// eslint-disable-next-line import/prefer-default-export
export const renderLogin = ($parent) => {
  $parent.innerHTML = TEMPLATE;

  const $form = $parent.querySelector('form');
  const $email = $parent.querySelector('#email');

  $email.focus();

  $form.addEventListener('input', updateSubmitButtonState);
  $form.addEventListener('submit', dispatchFormData);
  $form.addEventListener('formdata', requestLogin);
};
