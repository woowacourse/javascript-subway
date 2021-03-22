import { stationTemplate } from './stationsTemplate.js';

class Stations {
  constructor() {}

  init() {}
  getPageInfo() {
    return {
      title: '🚇 역 관리',
      contents: {
        main: stationTemplate(),
      },
    };
  }
  initDOM() {}
}

export default Stations;
