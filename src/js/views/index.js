import { renderHeader } from './commons/header/index.js';
import { renderHome } from './home/index.js';
import { renderStations } from './contents/stations/index.js';
import { renderLines } from './contents/lines/index.js';
import { renderSections } from './contents/sections/index.js';
import { renderLogin } from './auths/login/index.js';
import { renderSignUp } from './auths/signUp/index.js';
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
