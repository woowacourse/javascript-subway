import { store } from '../../subway/models/store';
import { removeFromSessionStorage } from '../../@shared/utils';
import { MESSAGE, ROUTE, SESSION_KEY, STATE_KEY } from '../constants';

export const getRedirectedPath = pathName => {
  const signedUserName = store[STATE_KEY.SIGNED_USER_NAME].get();
  const redirectedPath = {
    [ROUTE.ROOT]: ROUTE.ROOT,
    [ROUTE.SIGNIN]: signedUserName ? ROUTE.ROOT : ROUTE.SIGNIN,
    [ROUTE.SIGNUP]: signedUserName ? ROUTE.ROOT : ROUTE.SIGNUP,
    [ROUTE.SIGNOUT]: ROUTE.ROOT,
    [ROUTE.STATIONS]: signedUserName ? ROUTE.STATIONS : ROUTE.ROOT,
    [ROUTE.LINES]: signedUserName ? ROUTE.LINES : ROUTE.ROOT,
    [ROUTE.SECTIONS]: signedUserName ? ROUTE.SECTIONS : ROUTE.ROOT,
    [ROUTE.MAP]: signedUserName ? ROUTE.MAP : ROUTE.ROOT,
    [ROUTE.SEARCH]: signedUserName ? ROUTE.SEARCH : ROUTE.ROOT,
  };

  return redirectedPath[pathName];
};

export const routeTo = (pathName = ROUTE.ROOT) => {
  if (pathName === ROUTE.SIGNOUT && store[STATE_KEY.SIGNED_USER_NAME].get()) {
    if (!confirm(MESSAGE.CONFIRM.SIGNOUT)) return;
    store[STATE_KEY.SIGNED_USER_NAME].set(null);
  }

  pathName = getRedirectedPath(pathName);
  history.pushState({ path: pathName }, null, pathName);
  store[STATE_KEY.ROUTE].set(pathName);
};
