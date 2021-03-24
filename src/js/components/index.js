import { renderHeader } from './commons/header/view.js';
import { renderHome } from './home/view.js';
import { renderStations } from './contents/stations/view.js';
import { renderLines } from './contents/lines/view.js';
import { renderSections } from './contents/sections/view.js';
import { renderLogin } from './auths/login/view.js';
import { renderSignUp } from './auths/signUp/view.js';
import { $ } from '../utils/index.js';
import { PATHNAMES, TITLES } from '../constants/index.js';

const $header = $('header');
const $main = $('main');

const renderContents = {
  [PATHNAMES.HOME]: renderHome,
  [PATHNAMES.STATIONS]: renderStations,
  [PATHNAMES.LINES]: renderLines,
  [PATHNAMES.SECTIONS]: renderSections,
  [PATHNAMES.LOGIN]: renderLogin,
  [PATHNAMES.SIGN_UP]: renderSignUp,
  [PATHNAMES.LOGOUT]: renderHome,
};

const renderTitle = (pathname) => {
  document.title = TITLES[pathname];
};

export const renderContent = (pathname) => {
  renderContents[pathname]($main);
};

export const render = (pathname) => {
  renderTitle(pathname);
  renderHeader($header);
  renderContent(pathname);
};
