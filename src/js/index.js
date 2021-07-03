import '../css/index.css';

import LoginPage from './pages/login/LoginPage.js';
import SignupPage from './pages/signup/SignupPage.js';
import MainPage from './pages/main/MainPage.js';
import StationsController from './pages/stations/StationsController.js';
import LinesController from './pages/lines/LinesController.js';
import SectionsController from './pages/sections/SectionsController.js';
import MapController from './pages/map/MapController';

import router from './router.js';

const pages = {
  signupPage: new SignupPage(),
  loginPage: new LoginPage(),
  mainPage: new MainPage(),
  stationsPage: new StationsController(),
  linesPage: new LinesController(),
  sectionsPage: new SectionsController(),
  mapPage: new MapController(),
};

router.init(pages);
