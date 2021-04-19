import '../css/index.css';
import { $ } from './utils/DOM.js';
import AccessTokenManager from './stateManagers/AccessTokenManager.js';
import RouteManager from './stateManagers/RouteManager.js';
import SubwayStateManager from './stateManagers/SubwayStateManager.js';
import Login from './components/login/index.js';
import Signup from './components/signup/index.js';
import Section from './components/section/index.js';
import Line from './components/line/index.js';
import Station from './components/station/index.js';
import App from './components/App.js';
import Map from './components/map';

const stateManagers = {
  accessToken: new AccessTokenManager(),
  route: new RouteManager(),
  subwayState: new SubwayStateManager(),
};

const childComponents = {
  Login: new Login($('.js-main'), stateManagers),
  Signup: new Signup($('.js-main'), stateManagers),
  Station: new Station($('.js-main'), stateManagers),
  Line: new Line($('.js-main'), stateManagers),
  Section: new Section($('.js-main'), stateManagers),
  Map: new Map($('.js-main'), stateManagers),
};

const app = new App($('#app'), stateManagers, childComponents);

window.addEventListener('load', () => {
  const path = location.pathname;

  history.replaceState({ route: path }, null, path);
  app.render();
});

window.addEventListener('popstate', (e) => {
  app.render();
});
