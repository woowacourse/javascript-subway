import Component from '../../core/Component.js';
import { linesTemplate, lineListTemplate } from './template.js';
import { $, $$, showSnackbar, customConfirm } from '../../utils/index.js';
import { LOGIN_REQUIRED_TEMPLATE, LINES, MESSAGE, SNACKBAR_MESSAGE } from '../../constants/index.js';
import { getStationList, getCreatedLineData, getLineList, lineDeleted } from '../../service/index.js';

export default class Lines extends Component {
  #token;
  constructor() {
    super();
    this.#token;
  }

  bindEvent() {
    $('#line-create-button').addEventListener('click', this.handleLineCreateModalOpen);
    $('.subway-line-color-selector').addEventListener('click', this.handleLineColorSelector);
    $('#line-create-form').addEventListener('submit', this.handleLineCreateForm.bind(this));
    $('#line-create-modal').addEventListener('click', this.handleLineModalClose.bind(this));
    $('#line-edit-modal').addEventListener('click', this.handleLineModalClose.bind(this));
    $('.lines-container').addEventListener('click', ({ target }) => {
      if (target.classList.contains('line-edit-button')) {
        return;
      }

      if (target.classList.contains('line-delete-button')) {
        this.handleLineDelete(target);
      }
    });
  }

  async handleLineDelete(target) {
    const $lineListItem = target.closest('.line-list-item');
    const lineName = $lineListItem.querySelector('.line-name').innerText;
    const lineId = target.dataset.id;

    try {
      await customConfirm(MESSAGE.DELETE_CONFIRM(lineName));
    } catch {}

    const isDeleted = await lineDeleted({
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

  handleLineModalClose({ target }) {
    if (target.classList.contains('modal-close')) {
      $('#line-create-modal').classList.remove('open');
      $('#line-edit-modal').classList.remove('open');
    }
  }

  handleLineCreateModalOpen() {
    $('#line-create-modal').classList.add('open');
    $('#line-name-input').focus();
  }

  handleLineColorSelector({ target }) {
    if (!target.classList.contains('color-option')) {
      return;
    }

    const style = getComputedStyle(target);
    const backgroundColor = style.backgroundColor;
    const $lineColorInput = $('#line-color-input');

    $lineColorInput.style.backgroundColor = backgroundColor;
    $lineColorInput.placeholder = '';
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

  async handleLineCreateForm(e) {
    e.preventDefault();

    const name = e.target.elements['line-name-input'].value;
    const upStationId = e.target.elements['departure-station-select'].value;
    const downStationId = e.target.elements['arrival-station-select'].value;
    const distance = e.target.elements['distance-input'].value;
    const duration = e.target.elements['duration-input'].value;
    const color = e.target.elements['line-color-input'].style.backgroundColor;

    console.log(name, upStationId, downStationId);
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

    const createdLineData = await getCreatedLineData({
      token: this.#token,
      name,
      upStationId,
      downStationId,
      distance,
      duration,
      color,
    });

    if (!createdLineData) {
      showSnackbar(SNACKBAR_MESSAGE.CREATE_FAILURE);
      return;
    }

    $('#lines-list-container').insertAdjacentHTML('beforeend', lineListTemplate(createdLineData));
    showSnackbar(SNACKBAR_MESSAGE.CREATE_SUCCESS);
    $('#line-create-modal').classList.remove('open');
    $$('.modal input').forEach((inputTag) => (inputTag.value = ''));
  }

  render(token, stationList = [], lineList = []) {
    $('main').innerHTML = token ? linesTemplate(stationList, lineList) : LOGIN_REQUIRED_TEMPLATE;
  }

  async load(token = '') {
    const stationList = await getStationList(token);
    const lineList = await getLineList(token);

    this.#token = token;
    this.render(token, stationList, lineList);
    this.bindEvent();
  }
}
