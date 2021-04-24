import { PATH } from './constants/path';
import LinesController from './pages/lines/LinesController';
import LoginController from './pages/login/LoginController';
import LookupLinesController from './pages/lookupLines/LookupLinesController';
import MainController from './pages/main/MainController';
import SectionsController from './pages/sections/SectionsController';
import SignupController from './pages/signup/SignupController';
import StationsController from './pages/stations/StationsController';

const routes = {
  [PATH.ROOT]: new MainController(),
  [PATH.LOGIN]: new LoginController(),
  [PATH.SIGNUP]: new SignupController(),
  [PATH.STATIONS]: new StationsController(),
  [PATH.LINES]: new LinesController(),
  [PATH.SECTIONS]: new SectionsController(),
  [PATH.LOOKUPLINES]: new LookupLinesController(),
};

export default routes;
