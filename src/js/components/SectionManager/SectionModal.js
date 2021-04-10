import { SELECTOR, MESSAGES } from '../../constants/constants.js';
import { $, hide, show } from '../../utils/dom.js';
import popSnackbar from '../../utils/snackbar.js';
import { addSectionRequest } from '../../request.js';
import { modalTemplate } from './template.js';

export default class SectionModal {
  constructor(store) {
    this.store = store;
    this.$root = $(SELECTOR.MODAL);
    this.state = {
      lineId: '',
      upStationId: '',
      downStationId: '',
      distance: 0,
      duration: 0,
    };
  }

  init() {
    this.$root.innerHTML = modalTemplate;
    this.selectDOM();
    this.bindEvents();
    this.setOptions();
  }

  selectDOM() {
    this.$subwaySectionForm = $(SELECTOR.SECTION_FORM);
    this.$subwayLineSelect = $(SELECTOR.LINE_FOR_SECTION);
    this.$upStationSelect = $(SELECTOR.LINE_UP_STATION_SELECT);
    this.$downStationSelect = $(SELECTOR.LINE_DOWN_STATION_SELECT);
    this.$sameStationWarning = $(SELECTOR.SAME_STATION_WARNING);
    this.$modalCloseButton = $(SELECTOR.MODAL_CLOSE);
  }

  bindEvents() {
    this.$subwaySectionForm.addEventListener('submit', this.handleSubmit.bind(this));
    this.$upStationSelect.addEventListener('change', this.checkValidStation.bind(this));
    this.$downStationSelect.addEventListener('change', this.checkValidStation.bind(this));
    this.$modalCloseButton.addEventListener('click', this.close.bind(this));
    this.$root.addEventListener('mousedown', this.handleClickOutsideModal.bind(this));
    document.addEventListener('keydown', this.handleESCKey.bind(this));
  }

  open(lineID) {
    this.$root.classList.add('open');
    if (lineID) {
      const targetLine = [...this.$subwayLineSelect.options].find((option) => option.value === lineID);
      targetLine.setAttribute('selected', 'selected');
    }
  }

  setOptions() {
    this.$subwayLineSelect.append(...this.store.lines.map((line) => new Option(line.name, line.id)));
    this.$upStationSelect.append(...this.store.stations.map((station) => new Option(station.name, station.id)));
    this.$downStationSelect.append(...this.store.stations.map((station) => new Option(station.name, station.id)));
  }

  checkValidStation() {
    if (this.$upStationSelect.value === this.$downStationSelect.value) {
      show(this.$sameStationWarning);
      return;
    }

    hide(this.$sameStationWarning);
  }

  async handleSubmit(event) {
    event.preventDefault();

    const {
      'subway-line-for-section': { value: lineId },
      'up-station': { value: upStationId },
      'down-station': { value: downStationId },
      distance: { value: distance },
      duration: { value: duration },
    } = event.target.elements;

    if (upStationId === downStationId) return;

    this.state = { lineId, upStationId, downStationId, distance, duration };
    await this.addSection();
  }

  async addSection() {
    const accessToken = this.store.userAuth.accessToken;

    try {
      await addSectionRequest(this.state.lineId, this.state, accessToken);
      this.$subwaySectionForm.reset();
      this.close();
      popSnackbar(MESSAGES.SECTION_ADD.SUCCESS);

      const addSectionEvent = new CustomEvent('addSection', { detail: this.state.lineId });
      this.$root.dispatchEvent(addSectionEvent);
    } catch (error) {
      console.error(error);
      popSnackbar(error.message || MESSAGES.SECTION_ADD.FAIL);
    }
  }

  close() {
    this.$subwaySectionForm.reset();
    this.$root.classList.remove('open');
  }

  handleESCKey(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  handleClickOutsideModal(event) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }
}
