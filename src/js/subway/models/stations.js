import { State } from '../../@shared/models/State';
import { getFromSessionStorage } from '../../@shared/utils';
import { SESSION_KEY } from '../constants';
import { stationManageAPI } from '../utils';

export class Stations extends State {
  async update() {
    try {
      const accessToken = getFromSessionStorage(SESSION_KEY.ACCESS_TOKEN);

      const stations = await stationManageAPI.getStations(accessToken);
      this.set(stations);
    } catch (error) {
      console.error(error.message);
    }
  }
}
