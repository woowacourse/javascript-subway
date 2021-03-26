import ModalComponent from '../../core/ModalComponent.js';
import { stationModal } from './template/modal.js';

class Modal extends ModalComponent {
  constructor(parentNode, stateManagers) {
    super(parentNode, stateManagers);
  }

  render() {
    this.parentNode.innerHTML = stationModal();
  }
}

export default Modal;
