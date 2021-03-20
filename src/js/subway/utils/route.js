import { stateManager } from '../../@shared/models/StateManager';
import { removeFromSessionStorage } from '../../@shared/utils';
import { ROUTE, SESSION_KEY, STATE_KEY } from '../constants/constants';

export const routeTo = pathName => {
  if (pathName === ROUTE.SIGNOUT) {
    removeFromSessionStorage(SESSION_KEY.ACCESS_TOKEN);
    stateManager[STATE_KEY.SIGNED_USER].set('');
    pathName = ROUTE.ROOT;
  }

  history.pushState({ path: pathName }, null, pathName);
  stateManager[STATE_KEY.ROUTE].set(pathName);
};
