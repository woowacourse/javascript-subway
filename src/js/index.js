import '../css/index.css';
import { $, getFromSessionStorage } from './@shared/utils/index';
import { stateManager } from './@shared/models/StateManager';
import { Subway } from './subway';
import { ROUTE, SESSION_KEY, STATE_KEY } from './subway/constants/constants';
import { getUserName } from './subway/utils';

class App {
  constructor() {
    this.selectDOM();
    this.mountChildComponents();
    this.bindEvents();
  }

  selectDOM() {
    this.$app = $('#app');
  }

  mountChildComponents() {
    this.subway = new Subway();
  }

  bindEvents() {
    this.$app.addEventListener('click', event => {
      if (!event.target.classList.contains('js-link')) return;
      event.preventDefault();
      const path = event.target.dataset.link;

      history.pushState({ path }, null, path);
      stateManager[STATE_KEY.ROUTE].set(path);
    });
  }
}

window.addEventListener('popstate', event => {
  const path = event.state.path;

  stateManager[STATE_KEY.ROUTE].set(path);
});

window.addEventListener('load', async () => {
  const app = new App();
  const pathName = location.pathname;
  const accessToken = getFromSessionStorage(SESSION_KEY.ACCESS_TOKEN);
  const signedUser = accessToken ? await getUserName(accessToken) : '';
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

  stateManager[STATE_KEY.SIGNED_USER].set(signedUser);

  history.pushState({ path: redirectedPath[pathName] }, null, redirectedPath[pathName]);
  stateManager[STATE_KEY.ROUTE].set(redirectedPath[pathName]);
});
