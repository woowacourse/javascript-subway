import { $ } from '../utils/dom.js';
import { render } from '../../js/router.js';
import { SELECTOR } from '../constants/constants.js';

export default class NavigationBar {
  constructor() {
    this.navigation = $(SELECTOR.NAVIGATION);
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    this.navigation.addEventListener('click', (e) => {
      if (!e.target.matches(`${SELECTOR.NAVIGATION} button`)) return;

      e.preventDefault();
      const path = e.target.closest('a').getAttribute('href');

      history.pushState({ path }, null, path);
      render(path);
    });
  }
}
