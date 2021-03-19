// import '../css/index.css';
import { $ } from './utils/DOM.js';
import { NAVIGATION } from './constants/header.js';
import { ROUTE } from './constants/route.js';
import { headerTemplate } from './components/header.js';
import Login from './components/login/index.js';
import Signup from './components/signup/index.js';
import Section from './components/section/index.js';
import Line from './components/line/index.js';
import Station from './components/station/index.js';

class App {
  constructor() {
    this.components = {
      // [ROUTE.HOME]: loginRequiredTemplate,
      [ROUTE.STATION]: Station,
      [ROUTE.LINE]: Line,
      [ROUTE.SECTION]: Section,
      // [ROUTE.MAP]: loginRequiredTemplate,
      // [ROUTE.SEARCH]: loginRequiredTemplate,
      [ROUTE.LOGIN]: Login,
      [ROUTE.SIGNUP]: Signup,
    };

    this.renderHeader();
    this.addEventListeners();
  }

  renderHeader() {
    $('.js-header').innerHTML = headerTemplate(NAVIGATION);
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

      const route = anchor.getAttribute('href');
      history.pushState({ route }, null, route);
      this.render(route);
    });
  }
}

new App();
