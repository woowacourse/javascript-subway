import '../css/index.css';
import LinesController from './pages/lines/LinesController.js';
import LoginPage from './pages/login/LoginPage.js';
import MainPage from './pages/main/MainPage.js';
import SectionsController from './pages/sections/SectionsController.js';
import SignupPage from './pages/signup/SignupPage.js';
import StationsController from './pages/stations/StationsController.js';
import router from './router.js';

const pages = {
  signupPage: new SignupPage(),
  loginPage: new LoginPage(),
  mainPage: new MainPage(),
  stationsPage: new StationsController(),
  linesPage: new LinesController(),
  sectionsPage: new SectionsController(),
};

router.init(pages);
