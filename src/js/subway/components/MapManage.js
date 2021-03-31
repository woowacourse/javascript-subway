import { store } from '../../@shared/models/store';
import { getFromSessionStorage } from '../../@shared/utils';
import { ROUTE, SESSION_KEY, STATE_KEY } from '../constants';
import { lineManageAPI } from '../utils';
import { subwayView } from '../views';

export class MapManage {
  #props = null;

  constructor(props) {
    this.#props = props;
    this.#setup();
  }

  #setup() {
    store[STATE_KEY.ROUTE].subscribe(this.#updateMap.bind(this));
  }

  async #updateMap(route) {
    if (route !== ROUTE.MAP) return;

    try {
      const accessToken = getFromSessionStorage(SESSION_KEY.ACCESS_TOKEN);

      if (this.#props.cache.lines.length === 0) {
        this.#props.cache.lines = await lineManageAPI.getLines(accessToken);
      }

      subwayView.renderMapView(this.#props.cache.lines);
    } catch (error) {
      console.error(error.message);
    }
  }
}
