import { render } from './renderer.js';

import { getLinesInfo } from './components/lines/linesTemplate.js';
import { getLoginInfo } from './components/login/loginTemplate.js';
// import { getStationsInfo } from './templates/stations.js';
// import { getSectionsInfo } from './templates/sections.js';
// import { getSignUpInfo } from './templates/signup.js';

import { headerTemplate } from './layouts/headerTemplate.js';

class Router {
  constructor() {}

  init() {
    this.handlePopState();
  }

  router(data) {
    return {
      // stations: getStationsInfo(data),
      // sections: getSectionsInfo(data),
      lines: getLinesInfo(data),
      login: getLoginInfo(data),
      // signup: getSignUpInfo(data),
    };
  }

  getHistory(href) {
    const key = href.replace('/', '');
    // TODO data 불러오기 + getHistory 내부 로직 개선
    const data = {};
    const func = this.router(data);
    const { title = '', contents } = func[key];
    history.pushState({ contents }, title, href);

    render();
  }

  handlePopState() {
    window.addEventListener('popstate', () => {
      render();
    });
  }
}

export default Router;
