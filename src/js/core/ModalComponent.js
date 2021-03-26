import { $ } from '../utils/DOM.js';
import Component from './Component.js';

class ModalComponent extends Component {
  constructor(parentNode, stateManagers) {
    super(parentNode, stateManagers);
    $('.modal-close').addEventListener('click', () => this.hide());
    this.modal = $('.modal');
    // const a = () => {}; // 화살표 함수의 특성상 this.bind가 안되니까
    // $('.modal-close').addEventListener('click', this.hide.bind(this))
  }

  show() {
    this.modal.classList.add('open');
  }

  hide() {
    this.modal.classList.remove('open');
  }
}

export default ModalComponent;
