import '../css/index.css';
import '../images/subway_emoji.png';
import { updateUserInfo } from './subway/models/store';
import { Subway } from './subway';
import { userAuthAPI, routeTo } from './subway/utils';
import { DOM, SESSION_KEY } from './subway/constants';
import { Component } from './@shared/models/Component';
import { getFromSessionStorage } from './@shared/utils';

class App extends Component {
  mountChildComponents() {
    new Subway();
  }

  bindEvent() {
    DOM.APP.addEventListener('click', event => {
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
  const userName = await userAuthAPI.getUserName(accessToken);

  new App();
  await updateUserInfo(userName);
  routeTo(location.pathname);
});
