import { cache } from '..';
import { store } from '../../@shared/models/store';
import { getFromSessionStorage } from '../../@shared/utils';
import { ROUTE, SESSION_KEY, STATE_KEY } from '../constants';
import { lineManageAPI } from '../utils';
import { subwayView } from '../views';

export class MapDisplay {
  constructor() {
    this.#setup();
  }

  #setup() {
    store[STATE_KEY.ROUTE].subscribe(this.#updateMap.bind(this));
  }

  async #updateMap(route) {
    if (route !== ROUTE.MAP) return;

    try {
      const accessToken = getFromSessionStorage(SESSION_KEY.ACCESS_TOKEN);

      if (cache.lines.getValue().length === 0) {
        cache.lines.setValue(await lineManageAPI.getLines(accessToken));
      }

      subwayView.renderMapDisplay(cache.lines.getValue());
    } catch (error) {
      console.error(error.message);
    }
  }
}
