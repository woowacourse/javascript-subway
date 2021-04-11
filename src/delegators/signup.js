import { ALERT_MESSAGE, SELECTOR_ID } from '../constants';
import { requestSignUp } from '../api/member.js';

function delegateSignUpSubmitEvent(event) {
  event.preventDefault();
  const { target } = event;
  if (target.id === SELECTOR_ID.SIGN_UP_FORM) {
    onSignUpFormSubmit(target);
  }
}

function onSignUpFormSubmit(target) {
  const { email, name, password, confirm } = target;
  if (!checkpasswordMatched(password.value, confirm.value)) {
    alert(ALERT_MESSAGE.PASSWORD_UNMATCHED);
    return;
  }
  requestSignUp(email.value, name.value, password.value)
    .then(() => {
      history.back();
    })
    .catch(error => {
      console.log(error);
      alert(ALERT_MESSAGE.SIGNUP_FAILED);
    });
}

function checkpasswordMatched(password, passwordConfirm) {
  return password === passwordConfirm;
}

export default delegateSignUpSubmitEvent;
