import { $ } from '../utils/DOM.js';
import Component from './Component.js';

class ModalComponent extends Component {
  constructor(parentNode, stateManagers, updateItemList) {
    super(parentNode, stateManagers);

    this.updateItemList = updateItemList;
    this.dataset = {};

    this.modal = $('.modal');
    // TODO: 이중 추상화 이벤트 리스너 등록
    $('.modal-close').addEventListener('click', () => this.hide());
  }

  show() {
    this.modal.classList.add('open');
  }

  hide() {
    this.modal.classList.remove('open');
  }

  setDataset(dataset) {
    this.dataset = dataset;
    this.fillDatasetInForm();
  }

  fillDatasetInForm() {}
}

export default ModalComponent;
