import { $ } from '../../utils/dom.js';
import popSnackbar from '../../utils/snackbar.js';
import { SELECTOR, MESSAGES } from '../../constants/constants.js';
import { deleteSectionRequest, getLineByIdRequest } from '../../request.js';
import Line from '../../models/Line.js';
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
    this.$sectionStationList.addEventListener('click', this.handleItemButtons.bind(this));
  }

  handleLineSelect(event) {
    this.lineID = Number(event.target.value);
    const targetLine = this.store.lines.find((line) => line.id === this.lineID);

    this.$sectionStationList.innerHTML = targetLine.stations.map((station) => station.toListItemTemplate()).join('');
  }

  async handleItemButtons(event) {
    if (event.target.type !== 'button') return;

    if (event.target.dataset.action === 'edit') {
      // TODO: open edit modal
    }

    if (event.target.dataset.action === 'delete') {
      await this.deleteSection(event);
    }
  }

  async deleteSection(event) {
    const stationItem = event.target.closest('li');
    const itemDivider = stationItem.nextElementSibling;
    const stationID = stationItem.dataset.stationId;
    const stationName = stationItem.dataset.stationName;
    const accessToken = this.store.userAuth.accessToken;

    if (!window.confirm(MESSAGES.SECTION_DELETE.CONFIRM(stationName))) return;

    try {
      await deleteSectionRequest(this.lineID, stationID, accessToken);

      stationItem.remove();
      if (!itemDivider.matches('hr')) return;
      itemDivider.remove();

      this.deleteSectionData();
      popSnackbar(MESSAGES.SECTION_DELETE.SUCCESS(stationName));
    } catch (error) {
      console.error(error);
      popSnackbar(error.message);
    }
  }

  async deleteSectionData() {
    const updatedLineResponse = await getLineByIdRequest(this.lineID, this.store.userAuth.accessToken);
    const targetLine = this.store.lines.find((line) => line.id === this.lineID);
    const newLine = new Line(updatedLineResponse);
    const updatedLines = [...this.store.lines].splice(lines.indexOf(targetLine), 1, newLine);

    this.store.lines = updatedLines;
  }
}
