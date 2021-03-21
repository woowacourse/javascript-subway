import Component from '../../core/Component.js';
import { $, $$ } from '../../utils/index.js';

export default class Navigation extends Component {
  constructor() {
    super();
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

    this.changeSelectedButtonColor(e.target);

    const url = e.target.closest('.navigation-link').getAttribute('href');
    history.pushState({ url }, null, url);
  }

  changeSelectedButtonColor(target = '') {
    $$('.navigation-button').forEach((button) =>
      button.classList.remove('bg-cyan-100'),
    );

    if (target.id === 'navigation-main' || !target) {
      return;
    }

    target.classList.add('bg-cyan-100');
  }
}
