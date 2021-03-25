import { ALERT_MESSAGE, PATH, SELECTOR_ID, SESSION_STORAGE_KEY, STATE_KEY } from '../constants';
import { requestLoginToken } from '../api/member.js';
import { state } from '../store.js';
import router from '../router/router.js';
import { sessionStore } from '../utils/utils';

function delegateLoginSubmitEvent(event) {
  event.preventDefault();
  const { target } = event;
  if (target.id === SELECTOR_ID.LOG_IN_FORM) {
    onLogInFormSubmit(target);
  }
}

function onLogInFormSubmit(target) {
  const { email, password } = target;
  requestLoginToken(email.value, password.value)
    .then(accessToken => {
      sessionStore.setItem(SESSION_STORAGE_KEY.ACCESS_TOKEN, accessToken);
      state.update(STATE_KEY.IS_LOGGED_IN, true);
      history.pushState({ path: PATH.ROOT }, null, PATH.ROOT);
      router.navigate(PATH.ROOT);
    })
    .catch(error => {
      console.log(error);
      alert(ALERT_MESSAGE.LOGIN_FAILED);
    });
}

export default delegateLoginSubmitEvent;
