import { ALERT_MESSAGE, PATH, SELECTOR_ID, SESSION_STORAGE_KEY, STATE_KEY } from '../constants';
import { requestLoginToken } from '../api/member.js';
import { state } from '../store.js';
import router from '../router/router.js';
import { sessionStore } from '../utils/utils';

export function delegateLoginSubmitEvent(event) {
  event.preventDefault();
  const { target } = event;
  if (target.id === SELECTOR_ID.LOG_IN_FORM) {
    const { email, password } = target;
    login(email, password);
  }
}

async function login(email, password) {
  try {
    const accessToken = await requestLoginToken(email.value, password.value);
    sessionStore.setItem(SESSION_STORAGE_KEY.ACCESS_TOKEN, accessToken);
    sessionStore.setItem(SESSION_STORAGE_KEY.USER_EMAIL, email);
    sessionStore.setItem(SESSION_STORAGE_KEY.USER_PASSWORD, password);

    state.update(STATE_KEY.IS_LOGGED_IN, true);
    state.initState();

    router.pushState(PATH.ROOT);
    router.navigate(PATH.ROOT);
  } catch (error) {
    console.log(error);
    alert(ALERT_MESSAGE.LOGIN_FAILED);
  }
}

export function delegateLoginClickEvent(event) {
  const { target } = event;
  if (target.id === SELECTOR_ID.SIGN_UP_BUTTON) {
    event.preventDefault();
    moveToSignUpPage();
    return;
  }
}

function moveToSignUpPage() {
  router.pushState(PATH.SIGN_UP);
  router.navigate(PATH.SIGN_UP);
}
