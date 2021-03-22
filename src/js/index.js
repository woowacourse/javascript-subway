import '../css/index.css';
import '../images/subway_emoji.png';
import { $, getFromSessionStorage } from './@shared/utils/index';
import { stateManager } from './@shared/models/StateManager';
import { Subway } from './subway';
import { ROUTE, SESSION_KEY, STATE_KEY } from './subway/constants/constants';
import { getRedirectedPath, getUserName } from './subway/utils';
import { routeTo } from './subway/utils';

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
      const pathName = event.target.dataset.link;

      routeTo(pathName);
    });
  }
}

window.addEventListener('popstate', event => {
  const pathName = event.state.path;

  stateManager[STATE_KEY.ROUTE].set(pathName);
});

window.addEventListener('load', async () => {
  const app = new App();
  const pathName = getRedirectedPath(location.pathname);
  const accessToken = getFromSessionStorage(SESSION_KEY.ACCESS_TOKEN);
  const signedUser = accessToken ? await getUserName(accessToken) : '';

  stateManager[STATE_KEY.SIGNED_USER].set(signedUser);
  routeTo(pathName);
});
