import { $ } from '../../utils/dom.js';
import popSnackbar from '../../utils/snackbar.js';
import { SELECTOR, MESSAGES } from '../../constants/constants.js';
import { deleteSectionRequest, getLineByIdRequest } from '../../request.js';
import Line from '../../models/Line.js';
import { contentTemplate, modalTemplate } from './template.js';
import SectionModal from './SectionModal.js';

export default class SectionManager {
  constructor(store) {
    this.store = store;
    this.$content = $(SELECTOR.CONTENT);
    this.modal = new SectionModal(this.store);
  }

  init() {
    this.render();
    this.selectDOM();
    this.bindEvents();
    this.modal.init();
  }

  render() {
    this.$content.innerHTML = contentTemplate;
    this.$sectionsSelect = $(SELECTOR.SUBWAY_LINE_SELECT);
    this.$sectionsSelect.append(...this.store.lines.map((line) => new Option(line.name, line.id)));
  }

  selectDOM() {
    this.$sectionStationList = $(SELECTOR.SECTION_STATION_LIST);
    this.$sectionAddButton = $(SELECTOR.SECTION_ADD_BUTTON);
  }

  bindEvents() {
    this.$sectionsSelect.addEventListener('change', this.handleLineSelect.bind(this));
    this.$sectionStationList.addEventListener('click', this.handleDeleteButton.bind(this));
    this.$sectionAddButton.addEventListener('click', () => {
      this.modal.open();
    });
    $(SELECTOR.MODAL).addEventListener('addSection', this.addSection.bind(this));
  }

  handleLineSelect(event) {
    this.lineID = Number(event.target.value);
    const targetLine = this.store.lines.find((line) => line.id === this.lineID);
    const prevLineColor = [...this.$sectionsSelect.classList].find((className) => className.startsWith('bg-'));

    this.$sectionsSelect.classList.remove(prevLineColor);
    this.$sectionsSelect.classList.add(targetLine.color);
    this.$sectionStationList.innerHTML = targetLine.stations.map((station) => station.toListItemTemplate()).join('');
    this.$sectionStationList.querySelectorAll('[data-action="edit"]').forEach(($editButton) => $editButton.remove());
  }

  async handleDeleteButton(event) {
    if (event.target.dataset.action !== 'delete') return;

    await this.deleteSection(event);
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

      this.updateSectionData();
      popSnackbar(MESSAGES.SECTION_DELETE.SUCCESS(stationName));
    } catch (error) {
      console.error(error);
      popSnackbar(error.message);
    }
  }

  async addSection() {
    await this.updateSectionData();
    const targetLine = this.store.lines.find((line) => line.id === this.lineID);

    this.$sectionStationList.innerHTML = targetLine.stations.map((station) => station.toListItemTemplate()).join('');
  }

  async updateSectionData() {
    try {
      const updatedLineResponse = await getLineByIdRequest(this.lineID, this.store.userAuth.accessToken);
      const targetLine = this.store.lines.find((line) => line.id === this.lineID);
      const newLine = new Line(updatedLineResponse);
      const updatedLines = [...this.store.lines];

      updatedLines.splice(this.store.lines.indexOf(targetLine), 1, newLine);
      this.store.lines = updatedLines;
    } catch (error) {
      console.log(error);
    }
  }
}
