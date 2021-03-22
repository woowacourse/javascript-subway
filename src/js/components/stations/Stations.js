import { PAGE_TITLE } from '../../constants.js';
import { stationTemplate } from './stationsTemplate.js';

class Stations {
  constructor() {}

  init() {}
  getPageInfo() {
    return {
      title: PAGE_TITLE.STATIONS,
      contents: {
        main: stationTemplate(),
      },
    };
  }
  initDOM() {}
}

export default Stations;
