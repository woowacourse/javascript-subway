import { $ } from '../utils/DOM';
import Component from './Component';
class ModalComponent extends Component {
  constructor({ parentNode, modalKey }) {
    super({ parentNode });
    this.modalKey = modalKey;
    this.targetId = '';
  }

  show() {
    $(`.${this.modalKey}-modal`).classList.add('open');
  }

  hide() {
    $(`.${this.modalKey}-modal`).classList.remove('open');
  }

  setTarget(id) {
    this.targetId = id;
    this.fillTargetInForm();
  }

  fillTargetInForm() {}

  addEventListeners() {
    $(`.${this.modalKey}-modal .modal-close`).addEventListener('click', () => {
      this.hide();
    });
  }
}

export default ModalComponent;
