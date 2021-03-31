import Component from '../components/Component';
import { openModal } from '../utils/DOM';

class Modal {
  _router;

  constructor(props = {}) {
    this.props = props;
  }

  route(modalType) {
    if (this._router === undefined) {
      console.error('Modal에 router가 없습니다.');
      return;
    }

    if (!(this._router[modalType] instanceof Component)) {
      console.error('Modal._router의 key 값이 Component가 아닙니다.');
      return;
    }

    this._router[modalType].render();
    this._router[modalType].initialize();
    openModal();
  }
}

export default Modal;
