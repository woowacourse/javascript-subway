import { $ } from '../utils/DOM.js';
import Component from './Component.js';

class ModalComponent extends Component {
  constructor(parentNode, stateManagers, updateItemList) {
    super(parentNode, stateManagers);
    $('.modal-close').addEventListener('click', () => this.hide());
    this.modal = $('.modal');
    this.updateItemList = updateItemList;
  }

  show() {
    this.modal.classList.add('open');
  }

  hide() {
    this.modal.classList.remove('open');
  }
}

export default ModalComponent;
