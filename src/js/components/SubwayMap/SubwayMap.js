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
    const sortedSectionList = stationList.map((station, index) => {
      if (index === stationList.length - 1) return { name: station.name, id: station.id };

      const targetSection = sectionList.find((section) => station.id === section.upStation.id);

      return {
        name: targetSection.upStation.name,
        id: targetSection.upStation.id,
        color: line.color,
        duration: targetSection.duration,
        distance: targetSection.distance,
      };
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
