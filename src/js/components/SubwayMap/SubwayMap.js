import Component from '../../core/Component.js';
import { $ } from '../../utils/querySelector.js';
import { service } from '../../service/index.js';
import { subwayMapTemplate } from './template.js';

export default class SubwayMap extends Component {
  constructor() {
    super();
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

  async render(sortedSectionList = []) {
    $('main').innerHTML = subwayMapTemplate(sortedSectionList);
  }

  async load() {
    const lineList = await service.getLineList();
    const sortedSectionList = lineList.map((line) => this.getSortedSectionList(line));

    this.render(sortedSectionList);
    this.selectDOM();
    this.bindEvent();
  }
}
