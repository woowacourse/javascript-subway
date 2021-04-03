import { State } from '../../@shared/models/State';
import { stationManageAPI } from '../utils';

export class Stations extends State {
  async update() {
    try {
      const stations = await stationManageAPI.getStations();
      this.set(stations);
    } catch (error) {
      console.error(error.message);
    }
  }
}
