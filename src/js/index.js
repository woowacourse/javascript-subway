import '../css/index.css';

import { $ } from './utils/DOM.js';
import { stationTemplate } from './templates/lines.js';
import { headerTemplate, getNavButtonTemplate } from './templates/header.js';
import { NAVIGATION } from './constants/header.js';

const renderHeader = () => {
  $('header').innerHTML = headerTemplate;
  $('nav').innerHTML = Object.values(NAVIGATION)
    .map(getNavButtonTemplate)
    .join('');
};

const renderStation = () => {
  $('main').innerHTML = stationTemplate();
};

renderHeader();
renderStation();

const templates = {
  '/station': stationTemplate,
};
