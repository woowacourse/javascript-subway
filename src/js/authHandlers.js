import { REG_EXP } from './constants/constants.js';
import { MESSAGE } from './constants/messages.js';
import { $ } from './utils/DOM.js';

function showFailMessage(e, messageTarget) {
  const inputControl = e.target.closest('.js-input-control');

  inputControl.classList.remove('success');
  inputControl.classList.add('fail');
  $(messageTarget).classList.remove('d-none');
}

function hideFailMessage(e, messageTarget) {
  const inputControl = e.target.closest('.js-input-control');

  inputControl.classList.remove('fail');
  inputControl.classList.add('success');
  $(messageTarget).classList.add('d-none');
}

function checkEmailInputHandler(e) {
  $('#email-form-message').innerText = MESSAGE.ERROR.WRONG_EMAIL_FORMAT;

  if (!REG_EXP.EMAIL.test(e.target.value)) {
    showFailMessage(e, '#email-form-message');
  } else {
    hideFailMessage(e, '#email-form-message');
  }
}

function checkNameInputHandler(e) {
  if (e.target.value === '' || REG_EXP.NAME.test(e.target.value)) {
    showFailMessage(e, '#name-fail-message');
  } else {
    hideFailMessage(e, '#name-fail-message');
  }
}

function checkPasswordInputHandler(e) {
  if (!REG_EXP.PASSWORD.test(e.target.value)) {
    showFailMessage(e, '#password-fail-message');
  } else {
    hideFailMessage(e, '#password-fail-message');
  }
}

function checkPasswordConfirmInputHandler(e) {
  if ($('#password').value !== e.target.value) {
    showFailMessage(e, '#password-confirm-fail-message');
  } else {
    hideFailMessage(e, '#password-confirm-fail-message');
  }
}

export {
  showFailMessage,
  hideFailMessage,
  checkEmailInputHandler,
  checkNameInputHandler,
  checkPasswordInputHandler,
  checkPasswordConfirmInputHandler,
};
