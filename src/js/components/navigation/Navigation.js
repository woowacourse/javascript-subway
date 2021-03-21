import Component from '../../core/Component.js';
import { $, $$ } from '../../utils/index.js';
import { navigationTemplate } from './template.js';
import { LOCAL_STORAGE_KEY } from '../../constants/index.js';

export default class Navigation extends Component {
  constructor({ changeTemplate }) {
    super();
    this.changeTemplate = changeTemplate;
    this.selectDOM();
    this.bindEvent();
  }

  selectDOM() {
    this.$header = $('header');
  }

  bindEvent() {
    this.$header.addEventListener('click', this.handleNavigation.bind(this));
  }

  handleNavigation(e) {
    e.preventDefault();

    if (!e.target.classList.contains('btn')) {
      return;
    }

    if (e.target.id === 'navigation-logout-button') {
      localStorage.removeItem(LOCAL_STORAGE_KEY.TOKEN);
      this.changeTemplate('/');
      history.pushState({ url: '/' }, null, '/');
    }

    const url = e.target.closest('.navigation-link').getAttribute('href');
    this.changeTemplate(url);
    Navigation.changeSelectedButtonColor(e.target);
    history.pushState({ url }, null, url);
  }

  render(token = '') {
    $('#navigation').innerHTML = navigationTemplate(token);
  }

  static changeSelectedButtonColor(target = '') {
    $$('.navigation-button').forEach((button) =>
      button.classList.remove('bg-cyan-100'),
    );

    if (target.id === 'navigation-main' || !target) {
      return;
    }

    target.classList.add('bg-cyan-100');
  }
}
