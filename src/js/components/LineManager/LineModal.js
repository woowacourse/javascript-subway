import { SELECTOR, MESSAGES } from '../../constants/constants.js';
import { $, hide, show } from '../../utils/dom.js';
import { colorOptions } from '../../utils/mock.js';
import popSnackbar from '../../utils/snackbar.js';
import { createLineRequest, editLineRequest } from '../../request.js';
import { modalTemplate, inputSectionTemplate } from './template.js';
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
  }

  selectDOM() {
    this.$modalCloseButton = $(SELECTOR.MODAL_CLOSE);
    this.$lineCreationForm = $(SELECTOR.LINE_CREATION_FORM);
    this.$lineNameInput = $(SELECTOR.LINE_NAME_INPUT);
    this.$lineDuplicatedWarning = $(SELECTOR.LINE_DUPLICATED_WARNING);
    this.$lineColorInput = $(SELECTOR.LINE_COLOR_INPUT);
    this.$lineColorSelector = $(SELECTOR.SUBWAY_LINE_COLOR_SELECTOR);
    this.$updownInputContainer = $('#updown-data-container');
  }

  bindEvents() {
    this.$lineNameInput.addEventListener('focusout', this.checkNameDuplicated.bind(this));
    this.$lineColorSelector.addEventListener('click', this.handleColorSelect.bind(this));
    this.$lineCreationForm.addEventListener('submit', this.handleSubmit.bind(this));
    this.$modalCloseButton.addEventListener('click', this.close.bind(this));
    this.$root.addEventListener('mousedown', this.handleClickOutsideModal.bind(this));
    document.addEventListener('keydown', this.handleESCKey.bind(this));
  }

  bindCreationEvents() {
    this.$lineUpStationSelect.addEventListener('change', this.checkValidStation.bind(this));
    this.$lineDownStationSelect.addEventListener('change', this.checkValidStation.bind(this));
  }

  open(lineID = '') {
    this.$root.classList.add('open');
    this.type = lineID ? 'edit' : 'create';

    if (this.type === 'edit') {
      this.line = this.store.lines.find((line) => line.id === Number(lineID));
    }

    this.resetForm();
    this.activateInput();
    this.setModalColorOptions();
  }

  activateInput() {
    $(SELECTOR.LINE_NAME_INPUT).focus();

    if (this.type === 'create') {
      this.$updownInputContainer.innerHTML = inputSectionTemplate;
      this.$lineUpStationSelect = $(SELECTOR.LINE_UP_STATION_SELECT);
      this.$lineDownStationSelect = $(SELECTOR.LINE_DOWN_STATION_SELECT);
      this.$lineUpdownInput = $(SELECTOR.LINE_UP_DOWN_STATION_INPUT);
      this.$sameStationWarning = $(SELECTOR.SAME_STATION_WARNING);

      this.bindCreationEvents();
      this.setModalStationOptions();
    } else {
      this.$updownInputContainer.innerHTML = '';

      this.setEditingState();
      this.setEditForm();
    }
  }

  setEditingState() {
    const { name, color } = this.line;

    this.state = { ...this.state, name, color };
  }

  setEditForm() {
    const { name, color } = this.line;

    this.$lineNameInput.setAttribute('placeholder', name);
    this.$lineNameInput.setAttribute('value', name);
    this.$lineColorInput.setAttribute('placeholder', color);
    this.$lineColorInput.setAttribute('value', color);
    if (this.$lineUpdownInput) this.$lineUpdownInput.forEach(($div) => hide($div));
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

  setModalColorOptions() {
    this.$lineColorSelector.innerHTML = colorOptions.map(this.subwayLineColorOptionTemplate).join('');
  }

  setModalStationOptions() {
    this.$lineUpStationSelect.append(...this.store.stations.map((station) => new Option(station.name, station.id)));
    this.$lineDownStationSelect.append(...this.store.stations.map((station) => new Option(station.name, station.id)));
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

  checkValidStation() {
    if (this.$lineUpStationSelect.value === this.$lineDownStationSelect.value) {
      show(this.$sameStationWarning);
      return;
    }

    hide(this.$sameStationWarning);
  }

  subwayLineColorOptionTemplate(color, index) {
    const hasNewLine = (index + 1) % 10 === 0;
    return `<button type="button" class="color-option bg-${color}"></button> ${hasNewLine ? '<br/>' : ''}`;
  }

  handleColorSelect(event) {
    if (event.target.type !== 'button') return;

    event.target.blur();

    const color = [...event.target.classList].find((className) => className.startsWith('bg-'));
    const prevColor = [...$('#selected-line-color').classList].find((className) => className.startsWith('bg-'));

    $(SELECTOR.LINE_COLOR_INPUT).setAttribute('value', color);
    $('#selected-line-color').classList.remove(prevColor);
    $('#selected-line-color').classList.add(color);

    $(SELECTOR.COLOR_OPTION).forEach((option) => {
      if (option.classList.contains(color)) {
        option.classList.add('selected');
      } else {
        option.classList.remove('selected');
      }
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (!this.isLineNameAvailable) return;

    const {
      'subway-line-color': { value: color },
      'subway-line-name': { value: name },
    } = event.target.elements;
    this.state = { color, name };

    if (this.type === 'create') {
      const {
        'up-station': { value: upStationId },
        'down-station': { value: downStationId },
        distance: { value: distance },
        duration: { value: duration },
      } = event.target.elements;
      this.state = { ...this.state, upStationId, downStationId, distance, duration };

      await this.createLine();
    } else {
      await this.editLine();
    }
  }

  async createLine() {
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
      console.error(error);
      if (error.message === ERROR_CODE.UNAUTHORIZED) {
        this.store.updateLoggedIn(false);
        alert(MESSAGES.ERROR_UNAUTHORIZED);
        return;
      }
      popSnackbar(MESSAGES.LINE_CREATE.FAIL);
    }
  }

  async editLine() {
    const accessToken = this.store.userAuth.accessToken;
    const data = { name: this.state.name, color: this.state.color };

    try {
      await editLineRequest(this.line.id, data, accessToken);

      popSnackbar(MESSAGES.LINE_EDIT.SUCCESS);
      this.close();

      this.$root.dispatchEvent(
        new CustomEvent('editLine', {
          detail: {
            line: this.line,
            data,
          },
        })
      );
    } catch (error) {
      console.error(error);
      if (error.message === ERROR_CODE.UNAUTHORIZED) {
        this.store.updateLoggedIn(false);
        alert(MESSAGES.ERROR_UNAUTHORIZED);
        return;
      }
      popSnackbar(MESSAGES.LINE_EDIT.FAIL);
    }
  }

  close() {
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
