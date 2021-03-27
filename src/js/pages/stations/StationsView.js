import user from '../../models/user.js';
import {
  modifyStationTemplate,
  stationItemTemplate,
  stationListTemplate,
} from './templates/stationListTemplate.js';
import stationsTemplate from './templates/stationsTemplate.js';
import { $ } from '../../utils/DOM.js';

class StationsView {
  constructor() {
    this.stationManager = user.stationManager;
    this.$main = $('#main');
  }

  async init() {
    this.$main.innerHTML = stationsTemplate;
    $('#station-list').innerHTML = stationListTemplate(
      // TODO : 순서 역순으로 보여주기
      await this.stationManager.getAllStations()
    );
  }

  appendNewStation({ id, name }) {
    // TODO : 순서 정렬해서 보여주기
    $('#station-list').insertAdjacentHTML(
      'beforeend',
      stationItemTemplate({ id, name })
    );
  }

  renderModifyForm({ target }) {
    const { stationName } = target.closest('li').dataset;
    const inputTemplate = modifyStationTemplate(stationName);

    target.closest('li').innerHTML = inputTemplate;
  }

  renderModifyResult({ target }, id, name) {
    const $targetStation = target.closest('li');
    const $newTargetStation = stationItemTemplate({ id, name });

    $targetStation.insertAdjacentHTML('beforebegin', $newTargetStation);
    $targetStation.remove();
  }

  deleteResult({ target }) {
    target.closest('li').remove();
  }
}

export default StationsView;
