import { $ } from '../utils/DOM.js';
import Component from './Component.js';

class ModalComponent extends Component {
  constructor(parentNode, stateManagers, subwayState, updateSubwayState) {
    super(parentNode, stateManagers);

    this.subwayState = subwayState;
    this.updateSubwayState = updateSubwayState;
    this.targetId = '';

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

  setTargetId(id) {
    this.targetId = id;
    this.fillTargetInForm();
  }

  fillTargetInForm() {}
}

export default ModalComponent;

/*
데이터를 관리하자

탭 이동할 때 마다
1. 역 2. 노선 둘다 데이터를 요청해라

*/

/* 예외처리

1. 서버에 다맡긴다
2. 클라이언트가 다 한다.

*/
