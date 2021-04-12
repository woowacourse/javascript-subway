import { ALERT_MESSAGE, SELECTOR_ID } from '../constants';
import { requestSignUp } from '../api/member.js';
import router from '../router/router';

function delegateSignUpSubmitEvent(event) {
  event.preventDefault();
  const { target } = event;
  if (target.id === SELECTOR_ID.SIGN_UP_FORM) {
    const { email, name, password, confirm } = target;

    signUp({ email, name, password, confirm });
    return;
  }
}

async function signUp({ email, name, password, confirm }) {
  if (!checkpasswordMatched(password.value, confirm.value)) {
    alert(ALERT_MESSAGE.PASSWORD_UNMATCHED);
    return;
  }

  try {
    await requestSignUp(email.value, name.value, password.value);
    router.goBack();
  } catch (error) {
    console.log(error);
    alert(ALERT_MESSAGE.SIGNUP_FAILED);
  }
}

function checkpasswordMatched(password, passwordConfirm) {
  return password === passwordConfirm;
}

export default delegateSignUpSubmitEvent;
