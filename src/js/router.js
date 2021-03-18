import { render } from './renderer.js';

import { getLinesInfo } from './components/lines/linesTemplate.js';
import { getLoginInfo } from './components/login/loginTemplate.js';
import { getStationsInfo } from './components/stations/stationsTemplate.js';
import { getSectionsInfo } from './components/sections/sectionsTemplate.js';
import { getSignUpInfo } from './components/signup/signupTemplate.js';

import { headerTemplate } from './layouts/headerTemplate.js';

class Router {
  constructor() {
    this.router = {
      stations: getStationsInfo(),
      sections: getSectionsInfo(),
      lines: getLinesInfo(),
      login: getLoginInfo(),
      signup: getSignUpInfo(),
    };
  }

  init() {
    this._handlePopState();
  }

  renderPage(href) {
    const key = href.replace('/', '');
    const { title = '', contents } = this.router[key];
    history.pushState({ contents }, title, href);

    render();
  }

  _handlePopState() {
    window.addEventListener('popstate', () => {
      render();
    });
  }
}

export default Router;
