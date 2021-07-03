import { $ } from '../../utils/DOM';

import mapTemplate from './templates/mapTemplate';

class MapView {
  init(allStations) {
    $('#main').innerHTML = mapTemplate(allStations);
  }
}

export default MapView;
