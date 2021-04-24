import user from '../../models/user.js';
import {
  modifyStationTemplate,
  stationItemTemplate,
  stationListTemplate,
} from './templates/stationListTemplate.js';
import stationsTemplate from './templates/stationsTemplate.js';
import { $ } from '../../utils/DOM.js';

class StationsView {
  init(allStations) {
    $('#main').innerHTML = stationsTemplate;
    $('#station-list').innerHTML = stationListTemplate(allStations);
  }

  appendNewStation({ id, name }) {
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
