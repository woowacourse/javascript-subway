import { $ } from '../../utils/DOM.js';

import {
  modifyStationTemplate,
  stationItemTemplate,
  stationListTemplate,
} from './templates/stationListTemplate.js';
import stationsTemplate from './templates/stationsTemplate.js';

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

  renderModifyForm(targetStation) {
    const { stationName } = targetStation.closest('li').dataset;
    const inputTemplate = modifyStationTemplate(stationName);

    targetStation.closest('li').innerHTML = inputTemplate;
  }

  renderModifyResult({ target }, id, name) {
    const $targetStation = target.closest('li');
    const $newTargetStation = stationItemTemplate({ id, name });

    $targetStation.insertAdjacentHTML('beforebegin', $newTargetStation);
    $targetStation.remove();
  }

  deleteResult(targetStation) {
    targetStation.closest('li').remove();
  }
}

export default StationsView;
