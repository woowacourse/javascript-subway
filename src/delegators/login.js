import { PATH, SELECTOR_ID, SESSION_STORAGE_KEY, STATE_KEY } from '../constants';
import { requestLoginToken } from '../api/member.js';
import { state } from '../store.js';
import router from '../router/router.js';
import { sessionStore } from '../utils/utils';

export function delegateLoginSubmitEvent(event) {
  event.preventDefault();
  const { target } = event;
  if (target.id === SELECTOR_ID.LOG_IN_FORM) {
    onLogInFormSubmit(target);
  }
}

async function onLogInFormSubmit(target) {
  const { email, password } = target;
  const accessToken = await requestLoginToken(email.value, password.value);
  sessionStore.setItem(SESSION_STORAGE_KEY.ACCESS_TOKEN, accessToken);
  sessionStore.setItem(SESSION_STORAGE_KEY.USER_EMAIL, email);
  sessionStore.setItem(SESSION_STORAGE_KEY.USER_PASSWORD, password);
  state.update(STATE_KEY.IS_LOGGED_IN, true);
  state.initState();

  history.pushState({ path: PATH.ROOT }, null, PATH.ROOT);
  router.navigate(PATH.ROOT);
}

export function delegateLoginClickEvent(event) {
  const { target } = event;
  if (target.id === SELECTOR_ID.SIGN_UP_BUTTON) {
    event.preventDefault();
    onSignUpPageMove();
  }
}

function onSignUpPageMove() {
  history.pushState({ path: PATH.SIGN_UP }, null, PATH.SIGN_UP);
  router.navigate(PATH.SIGN_UP);
}
