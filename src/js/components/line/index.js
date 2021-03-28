import FetchComponent from '../../core/FetchComponent.js';
import { $ } from '../../utils/DOM.js';
import Modal from './modal.js';
import mainTemplate from './template/main.js';

class Line extends FetchComponent {
  constructor(parentNode, stateManagers) {
    super(parentNode, stateManagers);

    this.modal = new Modal(
      $('.js-modal'),
      stateManagers,
      this.subwayState,
      this.updateSubwayState.bind(this)
    );
  }

  render() {
    const { lines } = this.subwayState;
    this.parentNode.innerHTML = mainTemplate(lines);
  }

  addEventListeners() {
    $('.js-line-item__create').addEventListener('click', () => {
      this.modal.show();
    });
  }
}

export default Line;
