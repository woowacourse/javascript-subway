import '../css/index.css';

import { $ } from './utils/DOM.js';
import { NAVIGATION } from './constants/header.js';
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

renderHeader();

const templates = {
  '/': loginRequiredTemplate,
  '/station': stationsTemplate,
  '/line': linesTemplate,
  '/section': sectionsTemplate,
  '/map': loginRequiredTemplate,
  '/search': loginRequiredTemplate,
  '/login': loginTemplate,
  '/signup': signupTemplate,
};

const render = (path) => {
  const template = templates[path];
  $('.js-main').innerHTML = template();
};

window.addEventListener('popstate', (e) => {
  renderHeader(e.state.path);
});

$('.js-header').addEventListener('click', (e) => {
  const anchor = e.target.closest('.js-header__link');
  if (!anchor) return;

  e.preventDefault();

  const path = anchor.getAttribute('href');
  history.pushState({ path }, null, path);
  render(path);
});
