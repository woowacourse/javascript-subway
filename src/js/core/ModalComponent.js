import { $ } from '../utils/DOM';
import Component from './Component';
class ModalComponent extends Component {
  constructor({ parentNode, modalKey }) {
    super({ parentNode });
    this.modalKey = modalKey;
    this.targetId = '';
    // TODO: 이중 추상화 이벤트 리스너 등록
  }

  show() {
    $(`.modal-${this.modalKey}`).classList.add('open');
  }

  hide() {
    $(`.modal-${this.modalKey}`).classList.remove('open');
  }

  setTargetId(id) {
    this.targetId = id;
    this.fillTargetInForm();
  }

  fillTargetInForm() {}

  addEventListeners() {
    $(`.modal-${this.modalKey} .modal-close`).addEventListener('click', () => {
      this.hide();
    });
  }
}

export default ModalComponent;
