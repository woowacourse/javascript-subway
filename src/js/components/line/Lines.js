import Component from '../../core/Component.js';
import { linesTemplate, lineListTemplate } from './template.js';
import { $, $$, showSnackbar, customConfirm } from '../../utils/index.js';
import { LOGIN_REQUIRED_TEMPLATE, LINES, MESSAGE, SNACKBAR_MESSAGE } from '../../constants/index.js';
import { serviceAPI } from '../../service/index.js';

export default class Lines extends Component {
  #token;
  constructor() {
    super();
    this.#token;
  }

  selectDOM() {
    this.$lineCreateButton = $('#line-create-button');
    this.$subwayLineColorSelector = $('.subway-line-color-selector');
    this.$linesContainer = $('.lines-container');

    this.$modal = $('.modal');
    this.$modalTitle = $('#modal-title');
    this.$modalCloseButton = $('#modal-close-button');

    this.$modalForm = $('#modal-form');
    this.lineNameInput = $('#line-name-input');
    this.departureStationSelect = $('#departure-station-select');
    this.arrivalStationSelect = $('#arrival-station-select');
    this.distanceInput = $('#distance-input');
    this.durationInput = $('#duration-input');
    this.$lineColorInput = $('#line-color-input');
    this.$$modalInput = [this.lineNameInput, this.distanceInput, this.durationInput, this.$lineColorInput];
  }

  bindEvent() {
    this.$lineCreateButton.addEventListener('click', this.handleLineCreateModalOpen.bind(this));
    this.$subwayLineColorSelector.addEventListener('click', this.handleLineColorSelector.bind(this));
    this.$modalForm.addEventListener('submit', this.handleLineForm.bind(this));
    this.$modalCloseButton.addEventListener('click', this.handleLineModalClose.bind(this));
    this.$linesContainer.addEventListener('click', ({ target }) => {
      if (target.classList.contains('line-edit-button')) {
        this.handleLineEditModalOpen(target);
      }

      if (target.classList.contains('line-delete-button')) {
        this.handleLineDelete(target);
      }
    });
  }

  async handleLineEditModalOpen(target) {
    this.$modal.classList.add('open');
    this.$modalTitle.innerText = '🛤 노선 수정';
    this.$modalForm.classList.add('edit-form');
    this.$modalForm.classList.remove('create-form');
    this.$lineColorInput.placeholder = '';

    const lineData = await serviceAPI.getLineData({ token: this.#token, id: target.dataset.id });
    let duration = 0;
    let distance = 0;

    lineData.sections.forEach((section) => {
      duration += section.duration;
      distance += section.distance;
    });

    this.lineNameInput.value = lineData.name;
    this.departureStationSelect.value = lineData.sections[0].upStation.id;
    this.departureStationSelect.selected = lineData.sections[0].upStation.name;
    this.arrivalStationSelect.value = lineData.sections[lineData.sections.length - 1].downStation.id;
    this.arrivalStationSelect.selected = lineData.sections[lineData.sections.length - 1].downStation.name;
    this.distanceInput.value = distance;
    this.durationInput.value = duration;
    this.$lineColorInput.style.backgroundColor = lineData.color;
    this.$modalForm.dataset.id = target.dataset.id;
  }

  async handleLineDelete(target) {
    const $lineListItem = target.closest('.line-list-item');
    const lineName = $lineListItem.querySelector('.line-name').innerText;
    const lineId = target.dataset.id;

    const confirm = await customConfirm(MESSAGE.DELETE_CONFIRM(lineName));

    if (!confirm) {
      return;
    }

    const isDeleted = await serviceAPI.deleteLine({
      token: this.#token,
      id: lineId,
    });

    if (!isDeleted) {
      showSnackbar(SNACKBAR_MESSAGE.DELETE_FAILURE);
      return;
    }

    $lineListItem.remove();
    showSnackbar(SNACKBAR_MESSAGE.DELETE_SUCCESS);
  }

  handleLineModalClose() {
    this.$modal.classList.remove('open');
  }

  handleLineCreateModalOpen() {
    this.$modal.classList.add('open');
    $('#modal-title').innerText = '🛤️ 노선 추가';
    this.$modalForm.classList.add('create-form');
    this.$modalForm.classList.remove('edit-form');
    this.lineNameInput.focus();
  }

  handleLineColorSelector({ target }) {
    if (!target.classList.contains('color-option')) {
      return;
    }

    const style = getComputedStyle(target);
    const backgroundColor = style.backgroundColor;

    this.$lineColorInput.style.backgroundColor = backgroundColor;
    this.$lineColorInput.placeholder = '';
  }

  isValidLineNameLength(lineName) {
    return LINES.MIN_LINE_NAME_LENGTH <= lineName.length && lineName.length <= LINES.MAX_LINE_NAME_LENGTH;
  }

  isValidDepartureAndArrival(departure, arrival) {
    return departure !== arrival;
  }

  isPositiveNumber(number) {
    return number > 0;
  }

  async submitCreateForm(contents) {
    const createdLineData = await serviceAPI.getCreatedLineData({
      token: this.#token,
      ...contents,
    });

    if (!createdLineData) {
      showSnackbar(SNACKBAR_MESSAGE.CREATE_FAILURE);
      return;
    }

    $('#lines-list-container').insertAdjacentHTML('beforeend', lineListTemplate(createdLineData));
    showSnackbar(SNACKBAR_MESSAGE.CREATE_SUCCESS);
  }

  async submitEditForm(id, contents) {
    const isEdited = await serviceAPI.editLine({ token: this.#token, id, ...contents });

    if (!isEdited) {
      showSnackbar(SNACKBAR_MESSAGE.EDIT_FAILURE);
      return;
    }

    $(`.line-list-item[data-id="${id}"] > .subway-line-color-dot`).style.backgroundColor = contents.color;
    $(`.line-list-item[data-id="${id}"] > .line-name`).innerText = contents.name;
    showSnackbar(SNACKBAR_MESSAGE.EDIT_SUCCESS);
  }

  async handleLineForm(e) {
    e.preventDefault();

    const name = e.target.elements['line-name-input'].value;
    const upStationId = e.target.elements['departure-station-select'].value;
    const downStationId = e.target.elements['arrival-station-select'].value;
    const distance = e.target.elements['distance-input'].value;
    const duration = e.target.elements['duration-input'].value;
    const color = e.target.elements['line-color-input'].style.backgroundColor;

    if (!this.isValidLineNameLength(name)) {
      showSnackbar(SNACKBAR_MESSAGE.IS_NOT_VALID_LINE_NAME_LENGTH);
      return;
    }

    if (!this.isValidDepartureAndArrival(upStationId, downStationId)) {
      showSnackbar(SNACKBAR_MESSAGE.IS_NOT_VALID_DEPARTURE_AND_ARRIVAL);
      return;
    }

    if (!this.isPositiveNumber(distance) || !this.isPositiveNumber(duration)) {
      showSnackbar(SNACKBAR_MESSAGE.IS_NOT_POSITIVE_NUMBER);
      return;
    }

    if (!color) {
      showSnackbar(SNACKBAR_MESSAGE.REQUIRE_SELECT_LINE_COLOR);
      return;
    }

    const contents = { name, upStationId, downStationId, distance, duration, color };

    if (e.target.classList.contains('create-form')) {
      this.submitCreateForm(contents);
    }

    if (e.target.classList.contains('edit-form')) {
      const id = e.target.dataset.id;
      this.submitEditForm(id, contents);
    }

    this.$modal.classList.remove('open');
    this.$$modalInput.forEach((inputTag) => (inputTag.value = ''));
  }

  render(token, stationList = [], lineList = []) {
    $('main').innerHTML = token ? linesTemplate(stationList, lineList) : LOGIN_REQUIRED_TEMPLATE;
  }

  async load(token = '') {
    const stationList = await serviceAPI.getStationList(token);
    const lineList = await serviceAPI.getLineList(token);

    this.#token = token;
    this.render(token, stationList, lineList);

    if (token) {
      this.selectDOM();
      this.bindEvent();
    }
  }
}
