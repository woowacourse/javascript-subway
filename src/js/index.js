import '../css/index.css';
import { headerTemplate, getNavButtonTemplate } from './templates/header.js';
import { NAVIGATION } from './constants/header.js';

const renderHeader = () => {
  document.querySelector('header').innerHTML = headerTemplate;
  document.querySelector('nav').innerHTML = Object.values(NAVIGATION)
    .map(getNavButtonTemplate)
    .join('');
};

renderHeader();
