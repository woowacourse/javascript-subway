import { PATH, SELECTOR_CLASS, SELECTOR_ID, SESSION_STORAGE_KEY, STATE_KEY } from '../constants';
import router from '../router/router';
import { state } from '../store.js';
import { sessionStore } from '../utils/utils';

function delegateNavigatorClickEvent(event) {
  const { target } = event;
  if (target.id === SELECTOR_ID.LOG_OUT_BUTTON) {
    event.preventDefault();
    onLogOut();
    return;
  }
  if (target.id === SELECTOR_ID.SIGN_UP_BUTTON || target.classList.contains(SELECTOR_CLASS.NAVIGATOR_BUTTON)) {
    event.preventDefault();
    onPageMove(target);
  }
}

function onPageMove(target) {
  const path = target.getAttribute('href');
  if (!isAuthenticationPath(path) && !state.get(STATE_KEY.IS_LOGGED_IN)) {
    history.pushState({ path: PATH.ROOT }, null, PATH.ROOT);
    router.navigate(PATH.ROOT);
    return;
  }
  history.pushState({ path }, null, path);
  router.navigate(path);
}

const isAuthenticationPath = path => {
  return path === PATH.LOG_IN || path === PATH.SIGN_UP;
};

function onLogOut() {
  sessionStore.removeItem(SESSION_STORAGE_KEY.ACCESS_TOKEN);
  state.update(STATE_KEY.IS_LOGGED_IN, false);
  history.pushState({ path: PATH.ROOT }, null, PATH.ROOT);
  router.navigate(PATH.ROOT);
}

export default delegateNavigatorClickEvent;
