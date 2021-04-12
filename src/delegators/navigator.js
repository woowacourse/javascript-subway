import { PATH, SELECTOR_CLASS, SELECTOR_ID, SESSION_STORAGE_KEY, STATE_KEY } from '../constants';
import router from '../router/router';
import { state } from '../store.js';
import { sessionStore } from '../utils/utils';

function delegateNavigatorClickEvent(event) {
  const { target } = event;
  if (target.id === SELECTOR_ID.LOG_OUT_BUTTON) {
    event.preventDefault();
    logOut();
    return;
  }
  if (target.id === SELECTOR_ID.SIGN_UP_BUTTON || target.classList.contains(SELECTOR_CLASS.NAVIGATOR_BUTTON)) {
    event.preventDefault();
    const path = target.getAttribute('href');
    movePage(path);
    return;
  }
}

function movePage(path) {
  if (!isAuthenticationPath(path) && !state.get(STATE_KEY.IS_LOGGED_IN)) {
    router.pushState(PATH.ROOT);
    router.navigate(PATH.ROOT);
    return;
  }
  router.pushState(path);
  router.navigate(path);
}

const isAuthenticationPath = path => {
  return path === PATH.LOG_IN || path === PATH.SIGN_UP;
};

function logOut() {
  sessionStore.removeItem(SESSION_STORAGE_KEY.ACCESS_TOKEN);
  state.update(STATE_KEY.IS_LOGGED_IN, false);

  router.pushState(PATH.ROOT);
  router.navigate(PATH.ROOT);
}

export default delegateNavigatorClickEvent;
