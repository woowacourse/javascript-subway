import { renderHeader } from './commons/header/index.js';
import { renderHome } from './home/index.js';
import { renderStations } from './contents/stations/index.js';
import { renderLines } from './contents/lines/index.js';
import { renderSections } from './contents/sections/index.js';
import { renderLogin } from './auths/login/index.js';
import { renderSignUp } from './auths/signUp/index.js';
import { ROUTES } from '../constants/index.js';

const render = {
  [ROUTES.HOME]: renderHome,
  [ROUTES.STATIONS]: renderStations,
  [ROUTES.LINES]: renderLines,
  [ROUTES.SECTIONS]: renderSections,
  [ROUTES.LOGIN]: renderLogin,
  [ROUTES.SIGN_UP]: renderSignUp,
  [ROUTES.LOGOUT]: renderHome,
};

export { renderHeader, renderHome, render };
