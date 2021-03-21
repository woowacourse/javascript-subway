import { MESSAGE, REG_EXP } from './constants.js';
import { $ } from './utils/DOM.js';

function showFailMessage(e, messageTarget) {
  const inputControl = e.target.closest('.js-input-control');

  inputControl.classList.add('fail');
  inputControl.classList.remove('success');
  $(messageTarget).classList.remove('d-none');
}

function hideFailMessage(e, messageTarget) {
  const inputControl = e.target.closest('.js-input-control');

  inputControl.classList.remove('fail');
  inputControl.classList.add('success');
  $(messageTarget).classList.add('d-none');
}

function checkEmailInputHandler(e) {
  $('#email-fail-message').innerText = MESSAGE.ERROR.WRONG_EMAIL_FORMAT;

  if (!REG_EXP.EMAIL.test(e.target.value)) {
    showFailMessage(e, '#email-fail-message');
  } else {
    hideFailMessage(e, '#email-fail-message');
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
  console.log(e.target.value);
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
