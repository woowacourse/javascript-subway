import stationsTemplate from './templates/stationsTemplate.js';
import { $ } from '../../utils/DOM.js';
import {
  stationItemTemplate,
  stationListTemplate,
} from './templates/stationListTemplate.js';
import user from '../../models/User.js';

class StationsPage {
  constructor(router) {
    this.stationManager = user.stationManager;
    this.$main = $('#main');
    this.router = router;
  }

  init() {
    this.renderView();
    this.bindEvents();

    this.resetInput($('#stations-form'));
  }

  renderView() {
    this.$main.innerHTML = stationsTemplate;
    $('#station-list').innerHTML = stationListTemplate(
      this.stationManager.getAllStations()
    );
  }

  resetInput($target) {
    $target.reset();
    $target.elements['station-name'].focus();
  }

  addStationHandler(e) {
    e.preventDefault();

    const stationName = e.target.elements['station-name'].value;
    this.stationManager.addStation(stationName);
    //render
    $('#station-list').insertAdjacentHTML(
      'beforeend',
      stationItemTemplate({ id: 0, name: stationName })
    );

    this.resetInput(e.target);
  }

  updateStationHandler(e) {
    // TODO : early return 이 필요한 부분인가?
    if (!e.target.classList.contains('btn')) return;

    // 수정

    // 삭제
    if (e.target.classList.contains('js-delete-button')) {
      const $targetStation = e.target.closest('li');
      // 1. fetch
      // 2. local
      $targetStation.remove();
      this.stationManager.deleteStation($targetStation.dataset.stationId);
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

export default StationsPage;
