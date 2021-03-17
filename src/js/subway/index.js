import { menuButtons } from './views/templates/menuButtons.js';
import { $ } from '../@shared/utils/dom.js';

export class Subway {
  constructor(props) {
    this.props = props;
    this.selectDOM();
    this.initRender();
  }

  selectDOM() {
    this.$menuContainer = $('.menu-buttons-container');
    this.$main = $('main');
  }

  initRender() {
    this.$menuContainer.innerHTML = this.props.isSigned ? menuButtons : '';
  }
}
