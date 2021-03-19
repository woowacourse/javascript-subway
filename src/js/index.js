// import '../css/index.css';
import { $ } from './utils/DOM.js';
import { LINK } from './constants/header.js';
import { headerTemplate } from './components/header.js';
import Login from './components/login/index.js';
import Signup from './components/signup/index.js';
import Section from './components/section/index.js';
import Line from './components/line/index.js';
import Station from './components/station/index.js';

const PrivateRouter = (Station) => {
  if (localStorage.getItem('accessToken')) {
    return Station;
  }

  return Login;
};

class App {
  constructor() {
    this.components = {
      // [ROUTE.HOME]: loginRequiredTemplate,
      [LINK.STATION.ROUTE]: PrivateRouter(Station),
      [LINK.LINE.ROUTE]: PrivateRouter(Line),
      [LINK.SECTION.ROUTE]: PrivateRouter(Section),
      // [NAVIGATION.ROUTE.MAP]: loginRequiredTemplate,
      // [NAVIGATION.ROUTE.SEARCH]: loginRequiredTemplate,
      [LINK.LOGIN.ROUTE]: Login,
      [LINK.SIGNUP.ROUTE]: Signup,
    };

    this.renderHeader();
    this.addEventListeners();
  }

  isLogin() {
    return localStorage.getItem('accessToken');
  }

  renderHeader() {
    $('.js-header').innerHTML = headerTemplate(LINK);
  }

  render(route) {
    new this.components[route]($('.js-main'));
  }

  addEventListeners() {
    window.addEventListener('popstate', (e) => {
      this.render(e.state.route);
    });

    $('#app').addEventListener('click', (e) => {
      const anchor = e.target.closest('.js-link');
      if (!anchor) return;

      e.preventDefault();

      if (anchor.href === LINK.LOGOUT.ROUTE) {
        localStorage.clear();
      }

      const route = anchor.getAttribute('href');
      history.pushState({ route }, null, route);
      this.render(route);
    });
  }
}

new App();
