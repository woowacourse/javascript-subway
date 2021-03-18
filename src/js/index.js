import '../css/index.css';

import { $ } from './utils/DOM.js';
import { NAVIGATION } from './constants/header.js';
import { ROUTE } from './constants/route';
import { headerTemplate } from './templates/header.js';
import { loginTemplate } from './templates/login.js';
import { signupTemplate } from './templates/signup.js';
import { stationsTemplate } from './templates/stations.js';
import { linesTemplate, linesModal } from './templates/lines.js';
import { sectionsTemplate, sectionsModal } from './templates/sections.js';
import { loginRequiredTemplate } from './templates/loginRequired.js';

const renderHeader = () => {
  $('header').innerHTML = headerTemplate(NAVIGATION);
};

const templates = {
  [ROUTE.HOME]: loginRequiredTemplate,
  [ROUTE.STATION]: stationsTemplate,
  [ROUTE.LINE]: linesTemplate,
  [ROUTE.SECTION]: sectionsTemplate,
  [ROUTE.MAP]: loginRequiredTemplate,
  [ROUTE.SEARCH]: loginRequiredTemplate,
  [ROUTE.LOGIN]: loginTemplate,
  [ROUTE.SIGNUP]: signupTemplate,
};

const render = (route) => {
  const template = templates[route];
  $('.js-main').innerHTML = template();
};

window.addEventListener('popstate', (e) => {
  render(e.state.route);
});

$('.js-header').addEventListener('click', (e) => {
  const anchor = e.target.closest('.js-header__link');
  if (!anchor) return;

  e.preventDefault();

  const route = anchor.getAttribute('href');
  history.pushState({ route }, null, route);
  render(route);
});

renderHeader();
render(ROUTE.HOME);
