import { TITLES, PATH } from '../utils/constants';
import { getMainTemplate } from '../templates/main';
import { getStationsTemplate } from '../templates/stations';
import { getLinesTemplate } from '../templates/lines';
import { getSectionsTemplate } from '../templates/sections';
import { getSignInTemplate } from '../templates/signIn';
import { getSignUpTemplate } from '../templates/signUp';
import { requestCheckLogin } from '../requestData/requestUserData';

export default class Router {
  static instance;

  constructor(target) {
    if (Router.instance) {
      return Router.instance;
    }

    this.target = target;
    Router.instance = this;
  }

  async route(path) {
    history.pushState({ path }, null, path);
    await this.render(path);
  }

  async render(path) {
    if (path === PATH.MAIN) {
      this.target.innerHTML = this.getTemplate(path, await requestCheckLogin());
    } else {
      this.target.innerHTML = this.getTemplate(path);
    }

    document.title = TITLES[path];
  }

  getTemplate(path, isLogin) {
    const pathActions = {
      [PATH.MAIN]: () => getMainTemplate(isLogin),
      [PATH.STATIONS]: () => getStationsTemplate(),
      [PATH.LINES]: () => getLinesTemplate(),
      [PATH.SECTIONS]: () => getSectionsTemplate(),
      [PATH.SIGNIN]: () => getSignInTemplate(),
      [PATH.SIGNUP]: () => getSignUpTemplate(),
    };

    return pathActions[path]?.();
  }
}
