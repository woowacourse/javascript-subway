import { State } from '../../@shared/models/State';
import { getFromSessionStorage } from '../../@shared/utils';
import { SESSION_KEY } from '../constants';
import { lineManageAPI } from '../utils';

export class Lines extends State {
  async update() {
    try {
      const accessToken = getFromSessionStorage(SESSION_KEY.ACCESS_TOKEN);

      const lines = await lineManageAPI.getLines(accessToken);
      this.set(lines);
    } catch (error) {
      console.error(error.message);
    }
  }
}
