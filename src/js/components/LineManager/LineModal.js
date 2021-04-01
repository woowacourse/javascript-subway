import { SELECTOR, MESSAGES } from '../../constants/constants.js';
import { $, hide, show } from '../../utils/dom.js';
import { colorOptions } from '../../utils/mock.js';
import popSnackbar from '../../utils/snackbar.js';
import { createLineRequest } from '../../request.js';
import { modalTemplate } from './template.js';
import Line from '../../models/Line.js';

export default class LineModal {
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
    this.isLineNameAvailable = false;
  }

  init() {
    this.$root.innerHTML = modalTemplate;
    this.selectDOM();
    this.bindEvents();
    this.setModalDetails();
  }

  selectDOM() {
    this.$modalCloseButton = $(SELECTOR.MODAL_CLOSE);
    this.$lineCreationForm = $(SELECTOR.LINE_CREATION_FORM);
    this.$lineNameInput = $(SELECTOR.LINE_NAME_INPUT);
    this.$lineDuplicatedWarning = $(SELECTOR.LINE_DUPLICATED_WARNING);
    this.$lineUpStationSelect = $(SELECTOR.LINE_UP_STATION_SELECT);
    this.$lineDownStationSelect = $(SELECTOR.LINE_DOWN_STATION_SELECT);
    this.$lineColorSelector = $(SELECTOR.SUBWAY_LINE_COLOR_SELECTOR);
    this.$lineColorInput = $(SELECTOR.LINE_COLOR_INPUT);
    this.$lineUpdownInput = $(SELECTOR.LINE_UP_DOWN_STATION_INPUT);
  }

  bindEvents() {
    this.$lineCreationForm.addEventListener('submit', this.createLine.bind(this));
    this.$modalCloseButton.addEventListener('click', this.close.bind(this));
    this.$root.addEventListener('mousedown', this.handleClickOutsideModal.bind(this));
    this.$lineColorSelector.addEventListener('click', this.handleColorSelect.bind(this));
    this.$lineNameInput.addEventListener('focusout', this.checkNameDuplicated.bind(this));
  }

  open(lineID) {
    this.$root.classList.add('open');
    this.activateInput();
    this.resetForm();
    if (lineID) {
      const line = this.store.lines.find((line) => line.id === Number(lineID));

      this.type = 'edit';
      this.setEditingState(line);
      this.setEditForm(line);
    } else {
      this.type = 'open';
      this.$lineUpdownInput.forEach(($input) => show($input));
    }
  }

  setEditingState(line) {
    const { name, color } = line;

    this.state = { ...this.state, name, color };
  }

  setEditForm(line) {
    const { name, color } = line;

    this.$lineNameInput.setAttribute('placeholder', name);
    this.$lineNameInput.setAttribute('value', name);
    this.$lineColorInput.setAttribute('placeholder', color);
    this.$lineColorInput.setAttribute('value', color);
    this.$lineUpdownInput.forEach(($input) => hide($input));
  }

  resetForm() {
    this.$lineNameInput.setAttribute('placeholder', '노선 이름');
    this.$lineColorInput.setAttribute('placeholder', '색상을 아래에서 선택해주세요.');
    this.$lineNameInput.removeAttribute('value');
    this.$lineColorInput.removeAttribute('value');

    this.$lineCreationForm.reset();
    hide(this.$lineDuplicatedWarning);

    const prevColorOption = this.$lineColorSelector.querySelector('.selected');
    if (prevColorOption) {
      prevColorOption.classList.remove('selected');
    }
  }

  setModalDetails() {
    this.$lineColorSelector.innerHTML = colorOptions.map(this.subwayLineColorOptionTemplate).join('');
    this.$lineUpStationSelect.append(...this.store.stations.map((station) => new Option(station.name, station.id)));
    this.$lineDownStationSelect.append(...this.store.stations.map((station) => new Option(station.name, station.id)));
  }

  activateInput() {
    $(SELECTOR.LINE_NAME_INPUT).focus();
  }

  checkNameDuplicated(event) {
    const name = event.target.value;

    if (this.type === 'edit') {
      if (name === this.state.name) {
        this.isLineNameAvailable = true;
        hide(this.$lineDuplicatedWarning);

        return;
      }
    }

    if (this.store.lines.find((line) => line.name === name)) {
      show(this.$lineDuplicatedWarning);
      this.$lineNameInput.select();
      this.isLineNameAvailable = false;

      return;
    }
    this.isLineNameAvailable = true;
    hide(this.$lineDuplicatedWarning);
  }

  async createLine(event) {
    event.preventDefault();

    const {
      'subway-line-color': { value: color },
      'subway-line-name': { value: name },
      'up-station': { value: upStationId },
      'down-station': { value: downStationId },
      distance: { value: distance },
      duration: { value: duration },
    } = event.target.elements;

    this.state = { color, name, upStationId, downStationId, distance, duration };

    if (!this.isLineNameAvailable) return;

    try {
      const response = await createLineRequest(this.state, this.store.userAuth.accessToken);
      const newLine = new Line(response);

      popSnackbar(MESSAGES.LINE_CREATE.SUCCESS);
      this.close();

      this.$root.dispatchEvent(
        new CustomEvent('createLine', {
          detail: { line: newLine },
        })
      );
    } catch (error) {
      console.log(error);
      popSnackbar(MESSAGES.LINE_CREATE.FAIL);
    }
  }

  handleColorSelect(event) {
    if (event.target.type !== 'button') return;

    const color = [...event.target.classList].find((className) => className.startsWith('bg-'));
    $(SELECTOR.LINE_COLOR_INPUT).setAttribute('value', color);

    $(SELECTOR.COLOR_OPTION).forEach((option) => {
      if (option.classList.contains(color)) {
        option.classList.add('selected');
      } else {
        option.classList.remove('selected');
      }
    });
  }

  subwayLineColorOptionTemplate(color, index) {
    const hasNewLine = (index + 1) % 10 === 0;
    return `<button type="button" class="color-option bg-${color}"></button> ${hasNewLine ? '<br/>' : ''}`;
  }

  close() {
    this.$root.classList.remove('open');
  }

  handleClickOutsideModal(event) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }
}
