import { $ } from '../utils/DOM.js';
import Component from './Component.js';

class ModalComponent extends Component {
  constructor(parentNode, stateManagers) {
    super(parentNode, stateManagers);

    this.targetId = '';
    this.requestType = '';
    // TODO: 이중 추상화 이벤트 리스너 등록
  }

  show() {
    $('.modal').classList.add('open');
  }

  hide() {
    $('.modal').classList.remove('open');
  }

  setTargetId(id) {
    this.targetId = id;
    this.fillTargetInForm();
  }

  fillTargetInForm() {}
}

export default ModalComponent;
