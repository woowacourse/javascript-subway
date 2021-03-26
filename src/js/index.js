import '../css/index.css';
import '../images/subway_emoji.png';
import { $, getFromSessionStorage } from './@shared/utils/index';
import { stateManager } from './@shared/models/StateManager';
import { Subway } from './subway';
import { ROUTE, SESSION_KEY, STATE_KEY } from './subway/constants/constants';
import { routeTo, userAuthAPI } from './subway/utils';

class App {
  constructor() {
    this.selectDOM();
    this.mountChildComponents();
    this.bindEvent();
  }

  selectDOM() {
    this.$app = $('#app');
  }

  mountChildComponents() {
    new Subway();
  }

  bindEvent() {
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

  routeTo(pathName);
});

window.addEventListener('load', async () => {
  const accessToken = getFromSessionStorage(SESSION_KEY.ACCESS_TOKEN);
  const signedUser = accessToken ? await userAuthAPI.getUserName(accessToken) : null;

  new App();
  stateManager[STATE_KEY.SIGNED_USER].set(signedUser);
  routeTo(location.pathname);
});
