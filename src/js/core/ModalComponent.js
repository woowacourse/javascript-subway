import { $ } from '../utils/DOM.js';
import Component from './Component.js';

class ModalComponent extends Component {
  constructor(parentNode, stateManagers) {
    super(parentNode, stateManagers);

    this.targetId = '';
    this.requestType = '';
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
