import { menuButtons } from './views/templates/menuButtons.js';

export class Subway {
  constructor(props) {
    this.props = props;
    this.selectDOM();
    this.initRender();
  }

  selectDOM() {
    this.$menuContainer = document.querySelector('.menu-buttons-container');
    this.$main = document.querySelector('main');
  }

  initRender() {
    this.$menuContainer.innerHTML = this.props.isSigned ? menuButtons : '';
  }
}
