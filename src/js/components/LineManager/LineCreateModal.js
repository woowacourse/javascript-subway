import { SELECTOR, MESSAGES } from '../../constants/constants.js';
import { $, hide, show } from '../../utils/dom.js';
import popSnackbar from '../../utils/snackbar.js';
import { createLineRequest } from '../../request.js';
import { inputSectionTemplate } from './template.js';
import Line from '../../models/Line.js';

export default class LineCreateModal {
  constructor(store) {
    this.store = store;
    this.$root = $(SELECTOR.MODAL);

    this.state = {
      color: '',
      name: '',
      upStationId: 0,
      downStationId: 0,
      distance: 0,
      duration: 0,
    };
    this.isLineNameAvailable = true;
  }

  init() {
    this.selectDOM();
  }

  setModalTitle() {
    $(SELECTOR.LINE_MODAL_TITLE).textContent = '🛤️ 노선 추가';
  }

  selectDOM() {
    this.$lineNameInput = $(SELECTOR.LINE_NAME_INPUT);
    this.$updownInputContainer = $(SELECTOR.LINE_UP_DOWN_STATION_CONTAINER);
  }

  activateInput() {
    this.$updownInputContainer.innerHTML = inputSectionTemplate;
    this.$lineUpStationSelect = $(SELECTOR.LINE_UP_STATION_SELECT);
    this.$lineDownStationSelect = $(SELECTOR.LINE_DOWN_STATION_SELECT);
    this.$sameStationWarning = $(SELECTOR.SAME_STATION_WARNING);

    this.bindCreationEvents();
    this.setModalStationOptions();
  }

  bindCreationEvents() {
    this.$lineUpStationSelect.addEventListener('change', this.checkValidStation.bind(this));
    this.$lineDownStationSelect.addEventListener('change', this.checkValidStation.bind(this));
  }

  setModalStationOptions() {
    this.$lineUpStationSelect.append(...this.store.stations.map((station) => new Option(station.name, station.id)));
    this.$lineDownStationSelect.append(...this.store.stations.map((station) => new Option(station.name, station.id)));
  }

  isNameDuplicated(name) {
    if (this.store.lines.find((line) => line.name === name)) {
      this.isLineNameAvailable = false;
      this.$lineNameInput.select();

      return true;
    }
    this.isLineNameAvailable = true;
    return false;
  }

  checkValidStation() {
    if (this.$lineUpStationSelect.value === this.$lineDownStationSelect.value) {
      show(this.$sameStationWarning);

      return;
    }

    hide(this.$sameStationWarning);
  }

  async handleSubmit(formData) {
    if (!this.isLineNameAvailable) return;

    const {
      'subway-line-color': { value: color },
      'subway-line-name': { value: name },
      'up-station': { value: upStationId },
      'down-station': { value: downStationId },
      distance: { value: distance },
      duration: { value: duration },
    } = formData;

    this.state = { ...this.state, color, name, upStationId, downStationId, distance, duration };

    await this.createLine();
  }

  async createLine() {
    try {
      const response = await createLineRequest(this.state, this.store.userAuth.accessToken);
      const newLine = new Line(response);

      popSnackbar(MESSAGES.LINE_CREATE.SUCCESS);

      const createLineEvent = new CustomEvent('createLine', { detail: newLine });
      this.$root.dispatchEvent(createLineEvent);
    } catch (error) {
      console.error(error);
      popSnackbar(MESSAGES.LINE_CREATE.FAIL);
    }
  }
}
