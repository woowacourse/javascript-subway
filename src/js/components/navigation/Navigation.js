import Component from '../../core/Component.js';
import { $, $$ } from '../../utils/index.js';
import { navigationTemplate } from './template.js';

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

    Navigation.changeSelectedButtonColor(e.target);

    const url = e.target.closest('.navigation-link').getAttribute('href');
    this.changeTemplate(url);
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
