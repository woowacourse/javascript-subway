import { $ } from '../../utils/dom.js';
import { SELECTOR } from '../../constants/constants.js';
import { contentTemplate, modalTemplate } from './template.js';

export default class SectionManager {
  constructor(store) {
    this.store = store;
    this.$content = $(SELECTOR.CONTENT);
    this.$modal = $(SELECTOR.MODAL);
  }

  init() {
    this.render();
    this.selectDOM();
    this.bindEvents();
  }

  render() {
    this.$content.innerHTML = contentTemplate;
    this.$modal.innerHTML = modalTemplate;
    this.$sectionsSelect = $(SELECTOR.SUBWAY_LINE_SELECT);
    this.$sectionsSelect.append(...this.store.lines.map((line) => new Option(line.name, line.id)));
  }

  selectDOM() {
    this.$sectionStationList = $(SELECTOR.SECTION_STATION_LIST);
  }

  bindEvents() {
    this.$sectionsSelect.addEventListener('change', this.handleLineSelect.bind(this));
  }

  handleLineSelect(event) {
    const lineID = Number(event.target.value);
    const targetLine = this.store.lines.find((line) => line.id === lineID);

    this.$sectionStationList.innerHTML = targetLine.stations.map((station) => station.toListItemTemplate()).join('');
  }
}
