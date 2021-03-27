import Component from '../../core/Component.js';
import { linesTemplate, lineListTemplate } from './template.js';
import { $, $$, showSnackbar, customConfirm } from '../../utils/index.js';
import { LOGIN_REQUIRED_TEMPLATE, LINES, MESSAGE, SNACKBAR_MESSAGE } from '../../constants/index.js';
import {
  getStationList,
  getCreatedLineData,
  getLineList,
  lineDeleted,
  getLineData,
  isLineEdited,
} from '../../service/index.js';

export default class Lines extends Component {
  #token;
  constructor() {
    super();
    this.#token;
  }

  bindEvent() {
    $('#line-create-button').addEventListener('click', this.handleLineCreateModalOpen);
    $('.subway-line-color-selector').addEventListener('click', this.handleLineColorSelector);
    $('#modal-form').addEventListener('submit', this.handleLineForm.bind(this));
    $('.modal').addEventListener('click', this.handleLineModalClose.bind(this));
    $('.lines-container').addEventListener('click', ({ target }) => {
      if (target.classList.contains('line-edit-button')) {
        this.handleLineEditModalOpen(target);
      }

      if (target.classList.contains('line-delete-button')) {
        this.handleLineDelete(target);
      }
    });
  }

  async handleLineEditModalOpen(target) {
    $('.modal').classList.add('open');
    $('#modal-title').innerText = '🛤 노선 수정';
    $('#modal-form').classList.add('edit-form');
    $('#modal-form').classList.remove('create-form');
    $('#line-color-input').placeholder = '';

    const lineData = await getLineData({ token: this.#token, id: target.dataset.id });
    let duration = 0;
    let distance = 0;

    lineData.sections.forEach((section) => {
      duration += section.duration;
      distance += section.distance;
    });

    $('#line-name-input').value = lineData.name;
    $('#departure-station-select').value = lineData.sections[0].upStation.id;
    $('#departure-station-select').selected = lineData.sections[0].upStation.name;
    $('#arrival-station-select').value = lineData.sections[lineData.sections.length - 1].downStation.id;
    $('#arrival-station-select').selected = lineData.sections[lineData.sections.length - 1].downStation.name;
    $('#distance-input').value = distance;
    $('#duration-input').value = duration;
    $('#line-color-input').style.backgroundColor = lineData.color;
    $('#modal-form').dataset.id = target.dataset.id;
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
      $('.modal').classList.remove('open');
    }
  }

  handleLineCreateModalOpen() {
    $('.modal').classList.add('open');
    $('#modal-title').innerText = '🛤️ 노선 추가';
    $('#modal-form').classList.add('create-form');
    $('#modal-form').classList.remove('edit-form');
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

  async submitCreateForm(contents) {
    const createdLineData = await getCreatedLineData({
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
    const isEdited = isLineEdited({ token: this.#token, id, ...contents });

    if (!isEdited) {
      showSnackbar(SNACKBAR_MESSAGE.EDIT_FAILURE);
      return;
    }

    $(`.line-list-item[data-id="${id}"] > .subway-line-color-dot`).style.backgroundColor = contents.color;
    $(`.line-list-item[data-id="${id}"] > .line-name`).innerText = contents.name;
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

    const contents = { name, upStationId, downStationId, distance, duration, color };

    if (e.target.classList.contains('create-form')) {
      this.submitCreateForm(contents);
    }

    if (e.target.classList.contains('edit-form')) {
      const id = e.target.dataset.id;
      this.submitEditForm(id, contents);
    }

    $('.modal').classList.remove('open');
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

    if (token) {
      this.bindEvent();
    }
  }
}
