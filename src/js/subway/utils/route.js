import { stateManager } from '../../@shared/models/StateManager';
import { removeFromSessionStorage } from '../../@shared/utils';
import { ROUTE, SESSION_KEY, STATE_KEY } from '../constants/constants';

export const getRedirectedPath = pathName => {
  const signedUser = stateManager[STATE_KEY.SIGNED_USER].get();
  const redirectedPath = {
    [ROUTE.ROOT]: ROUTE.ROOT,
    [ROUTE.SIGNIN]: signedUser ? ROUTE.ROOT : ROUTE.SIGNIN,
    [ROUTE.SIGNUP]: signedUser ? ROUTE.ROOT : ROUTE.SIGNUP,
    [ROUTE.SIGNOUT]: ROUTE.ROOT,
    [ROUTE.STATIONS]: signedUser ? ROUTE.STATIONS : ROUTE.ROOT,
    [ROUTE.LINES]: signedUser ? ROUTE.LINES : ROUTE.ROOT,
    [ROUTE.SECTIONS]: signedUser ? ROUTE.SECTIONS : ROUTE.ROOT,
    [ROUTE.MAP]: signedUser ? ROUTE.MAP : ROUTE.ROOT,
    [ROUTE.SEARCH]: signedUser ? ROUTE.SEARCH : ROUTE.ROOT,
  };

  return redirectedPath[pathName];
};

export const routeTo = pathName => {
  if (pathName === ROUTE.SIGNOUT) {
    removeFromSessionStorage(SESSION_KEY.ACCESS_TOKEN);
    stateManager[STATE_KEY.SIGNED_USER].set('');
    pathName = getRedirectedPath(pathName);
  }

  history.pushState({ path: pathName }, null, pathName);
  stateManager[STATE_KEY.ROUTE].set(pathName);
};
