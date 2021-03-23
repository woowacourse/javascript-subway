import Component from '../../core/Component.js';
import { stationsTemplate } from './template.js';
import { $, API } from '../../utils/index.js';
import { LOGIN_REQUIRED_TEMPLATE } from '../../constants/index.js';
export default class Stations extends Component {
  constructor() {
    super();
  }

  bindEvent() {}

  async getStationList(token) {
    try {
      const response = await API.getStationList(token);
      const responseJSON = await response.json();

      return responseJSON;
    } catch (err) {
      throw new Error(err);
    }
  }

  render(token, stationList) {
    $('main').innerHTML = token
      ? stationsTemplate(stationList)
      : LOGIN_REQUIRED_TEMPLATE;
  }

  async load(token) {
    try {
      const stationList = await this.getStationList(token);

      this.render(token, stationList);
      this.bindEvent();
    } catch (err) {
      console.error(err);
    }
  }
}
