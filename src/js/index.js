import '../css/index.css';
// import '../images/subway_emoji.png';

import { $ } from './utils/DOM.js';
import { stationsTemplate } from './templates/stations.js';
import { headerTemplate, getNavButtonTemplate } from './templates/header.js';
import { NAVIGATION } from './constants/header.js';
import { loginRequiredTemplate } from './templates/loginRequiredTemplate.js';

const renderHeader = () => {
  $('header').innerHTML = headerTemplate;
  $('nav').innerHTML = Object.values(NAVIGATION)
    .map(getNavButtonTemplate)
    .join('');
};

const renderStation = () => {
  $('main').innerHTML = stationsTemplate();
};

$('main').innerHTML = loginRequiredTemplate();
renderHeader();
// renderStation();

const templates = {
  '/station': stationsTemplate,
};
