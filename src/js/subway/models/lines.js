import { State } from '../../@shared/models/State';
import { lineManageAPI } from '../utils';

export class Lines extends State {
  async update() {
    try {
      const lines = await lineManageAPI.getLines();

      this.set(lines);
    } catch (error) {
      console.error(error.message);
    }
  }
}
