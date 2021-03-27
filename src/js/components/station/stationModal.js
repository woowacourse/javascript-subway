import { initModal, onModalShow } from '../../utils/modal.js';
import { $ } from '../../utils/dom.js';

class StationModal {
  constructor() {
    this.stationInfo = null;
  }

  init() {
    initModal();
  }

  handleModifyStationOpen({ $stationItem, id, name }) {
    onModalShow();
    $('#station-modify-input').value = name;
    $('#station-modify-input').focus();
  }

  _handleModifyStation() {
    // 모달 열기 + input값 초기화
    onModalClose();
    // proccess 처리
  }
}

export default StationModal;
