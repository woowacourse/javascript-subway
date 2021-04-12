import Component from '../../core/Component.js';
import { $ } from '../../utils/querySelector.js';
import { serviceAPI } from '../../service/index.js';
import { LOGIN_REQUIRED_TEMPLATE } from '../../constants/index.js';
import { subwayMapTemplate } from './template.js';

export default class SubwayMap extends Component {
  #token;
  constructor() {
    super();
    this.#token;
  }

  selectDOM() {
    this.$sectionListContainer = $('#section-list-container');
  }

  bindEvent() {}

  getSortedSectionList(line) {
    const stationList = line.stations;
    const sectionList = line.sections;
    const sortedSectionList = [];

    stationList.forEach((station, index) => {
      if (index === stationList.length - 1) {
        sortedSectionList.push({ name: station.name, color: line.color });
        return;
      }

      sectionList.forEach((section) => {
        if (station.name === section.upStation.name) {
          sortedSectionList.push({
            name: station.name,
            duration: section.duration,
            distance: section.distance,
            color: line.color,
          });
        }
      });
    });

    return sortedSectionList;
  }

  async render(token, sortedSectionList = []) {
    $('main').innerHTML = token ? subwayMapTemplate(sortedSectionList) : LOGIN_REQUIRED_TEMPLATE;
  }

  async load(token = '') {
    this.#token = token;
    const lineList = await serviceAPI.getLineList(token);
    const sortedSectionList = lineList.map((line) => this.getSortedSectionList(line));

    this.render(token, sortedSectionList);
    if (token) {
      this.selectDOM();
      this.bindEvent();
    }
  }
}
