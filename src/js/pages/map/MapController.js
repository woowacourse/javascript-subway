import Cookies from 'js-cookie';

import pages from '../../models/pages';
import MapView from './MapView';

import router from '../../router';

import showSnackBar from '../../utils/snackbar';

import { SNACKBAR_MESSAGE } from '../../constants/messages';
import { COOKIE_KEY } from '../../constants/constants';
import { PATH } from '../../constants/path';

class MapController {
  constructor() {
    this.mapView = new MapView();
  }

  async init() {
    const Map = await this.getMap();

    if (!Map) return;

    this.mapView.init(Map);
  }

  async getMap() {
    const { Map, response } = await pages.sectionManager.getMap();

    switch (response.status) {
      case 401:
        showSnackBar(SNACKBAR_MESSAGE.ERROR.INVALID_USER);
        Cookies.remove(COOKIE_KEY.JWT_TOKEN);
        router.navigate(PATH.ROOT);
        break;

      default:
        return Map;
    }
  }
}

export default MapController;
