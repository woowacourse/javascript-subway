import { $ } from '../utils/DOM';
import Component from './Component';
class ModalComponent extends Component {
  constructor({ parentNode, modalName }) {
    super({ parentNode });
    this.modalName = modalName;
    this.targetId = '';
  }

  show() {
    $(`.${this.modalName}-modal`).classList.add('open');
  }

  hide() {
    $(`.${this.modalName}-modal`).classList.remove('open');
  }

  setTarget(id) {
    this.targetId = id;
    this.fillTargetInForm();
  }

  fillTargetInForm() {}

  addEventListeners() {
    $(`.${this.modalName}-modal .modal-close`).addEventListener('click', () => {
      this.hide();
    });
  }
}

export default ModalComponent;
