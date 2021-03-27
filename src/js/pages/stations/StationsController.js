import { $, resetInput } from '../../utils/DOM.js';
import user from '../../models/user.js';
import StationsView from './StationsView.js';

class StationsController {
  constructor(router) {
    this.stationManager = user.stationManager;
    this.stationsView = new StationsView();
    this.router = router;
  }

  async init() {
    await this.stationsView.init();
    this.bindEvents();

    resetInput($('#stations-form'), $('#station-name'));
  }

  async addStationHandler(e) {
    e.preventDefault();

    try {
      const stationName = e.target.elements['station-name'].value;
      const newStation = await this.stationManager.addStation(stationName);

      this.stationsView.appendNewStation(newStation);
      resetInput(e.target, $('#station-name'));
    } catch (error) {
      alert('지하철 역 추가에 실패하였습니다.');
      console.error('fail fetch');
    }
  }

  async updateStationHandler(e) {
    // TODO : early return 이 필요한 부분인가?
    if (!e.target.classList.contains('btn')) return;

    if (e.target.classList.contains('js-modify-button')) {
      this.stationsView.renderModifyForm(e);
    }

    if (e.target.classList.contains('js-save-modify-button')) {
      e.preventDefault();

      const { stationId } = e.target.closest('li').dataset;
      const newStationName = e.target.closest('form').elements[
        'new-station-name'
      ].value;

      const resFlag = await this.stationManager.modifyStation(
        Number(stationId),
        newStationName
      );

      if (!resFlag) {
        alert('역 수정에 실패했습니다.');
        return;
      }

      this.stationsView.renderModifyResult(e, stationId, newStationName);
    }

    if (e.target.classList.contains('js-delete-button')) {
      const targetStationId = e.target.closest('li').dataset.stationId;
      const resFlag = await this.stationManager.deleteStation(targetStationId);
      if (!resFlag) {
        alert('역 삭제에 실패했습니다.');
        return;
      }

      this.stationsView.deleteResult(e);
    }
  }

  bindEvents() {
    $('#stations-form').addEventListener(
      'submit',
      this.addStationHandler.bind(this)
    );
    $('#station-list').addEventListener(
      'click',
      this.updateStationHandler.bind(this)
    );
  }
}

export default StationsController;
