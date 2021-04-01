import { TITLES, PATH } from '../utils/constants';
import { getMainTemplate } from '../templates/main';
import { getStationsTemplate } from '../templates/stations';
import { getLinesTemplate } from '../templates/lines';
import { getSectionsTemplate } from '../templates/sections';
import { getSignInTemplate } from '../templates/signIn';
import { getSignUpTemplate } from '../templates/signUp';
import { isSignIn } from '../validators/boolean';

class Router {
  constructor(target) {
    this.target = target;
  }

  route(path) {
    window.history.pushState({ path }, null, path);
    this.render(path);
  }

  render(path) {
    this.target.innerHTML = this.getTemplate(path);
    document.title = TITLES[path];
  }

  getTemplate(path) {
    const pathActions = {
      [PATH.MAIN]: () => getMainTemplate(isSignIn()),
      [PATH.STATIONS]: () => getStationsTemplate(),
      [PATH.LINES]: () => getLinesTemplate(),
      [PATH.SECTIONS]: () => getSectionsTemplate(),
      [PATH.SIGNIN]: () => getSignInTemplate(),
      [PATH.SIGNUP]: () => getSignUpTemplate(),
    };

    return pathActions[path]?.();
  }
}

export default Router;
