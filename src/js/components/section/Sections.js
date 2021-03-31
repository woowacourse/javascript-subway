import Component from '../../core/Component.js';
import { sectionListTemplate, sectionsTemplate } from './template.js';
import { $, customConfirm, showSnackbar } from '../../utils/index.js';
import { LOGIN_REQUIRED_TEMPLATE, MESSAGE, SNACKBAR_MESSAGE } from '../../constants/index.js';
import { serviceAPI } from '../../service/index.js';

export default class Sections extends Component {
  #token;
  #lineId;
  constructor() {
    super();
    this.#token;
    this.#lineId;
  }

  selectDOM() {
    this.$modal = $('.modal');
    this.$modalForm = $('#modal-form');
    this.$modalCloseButton = $('#modal-close-button');
    this.$lineSelect = $('#line-select');
    this.$sectionListContainer = $('#section-list-container');
    this.$createSectionButton = $('.create-section-btn');
    this.$sectionContainer = $('.sections-container');
  }

  bindEvent() {
    this.$lineSelect.addEventListener('change', this.handleLineSelect.bind(this));
    this.$createSectionButton.addEventListener('click', this.handleModalOpen.bind(this));
    this.$modalCloseButton.addEventListener('click', this.handleModalClose.bind(this));
    this.$modalForm.addEventListener('submit', this.handleSectionForm.bind(this));
    this.$sectionContainer.addEventListener('click', this.handleSectionDelete.bind(this));
  }

  async handleSectionDelete({ target }) {
    if (!target.classList.contains('section-delete-button')) {
      return;
    }

    const $sectionListItem = target.closest('.section-list-item');
    const stationName = $sectionListItem.querySelector('.section-name').innerText;
    const stationId = target.dataset.id;

    const confirm = await customConfirm(MESSAGE.DELETE_CONFIRM(stationName));

    if (!confirm) {
      return;
    }

    const isDeleted = await serviceAPI.deleteSection({
      token: this.#token,
      lineId: this.#lineId,
      stationId,
    });

    if (!isDeleted) {
      showSnackbar(SNACKBAR_MESSAGE.DELETE_FAILURE);
      return;
    }

    $sectionListItem.remove();
    showSnackbar(SNACKBAR_MESSAGE.DELETE_SUCCESS);
  }

  async handleSectionForm(e) {
    e.preventDefault();

    this.#lineId = e.target.elements['modal-line-select'].value;
    const upStationId = e.target.elements['previous-station-select'].value;
    const downStationId = e.target.elements['next-station-select'].value;
    const distance = e.target.elements['distance-input'].value;
    const duration = e.target.elements['duration-input'].value;

    const createdSectionData = await serviceAPI.getCreatedSectionData({
      token: this.#token,
      id: this.#lineId,
      contents: { upStationId, downStationId, duration, distance },
    });

    if (!createdSectionData) {
      showSnackbar(SNACKBAR_MESSAGE.CREATE_FAILURE);
      return;
    }

    showSnackbar(SNACKBAR_MESSAGE.CREATE_SUCCESS);

    this.$lineSelect.querySelector(`option[value="${this.#lineId}"]`).selected = true;

    const changeEvent = new Event('change');
    this.$lineSelect.dispatchEvent(changeEvent);
    e.target.reset();
    this.handleModalClose();
  }

  handleModalOpen() {
    this.$modal.classList.add('open');
  }

  handleModalClose() {
    this.$modal.classList.remove('open');
  }

  async handleLineSelect({ target }) {
    this.#lineId = target.value;

    const line = await serviceAPI.getLineData({ token: this.#token, id: this.#lineId });
    const stationList = line.stations;
    const sectionList = line.sections;
    const lineColor = line.color;
    const sortedSectionList = [];

    stationList.forEach((station, index) => {
      if (index === stationList.length - 1) {
        sortedSectionList.push({ name: station.name, id: station.id });
        return;
      }

      sectionList.find((section) => {
        if (station.name === section.upStation.name) {
          sortedSectionList.push({
            name: station.name,
            id: station.id,
            duration: section.duration,
            distance: section.distance,
          });
          return true;
        }
        return false;
      });
    });

    this.$sectionListContainer.innerHTML = sortedSectionList
      .map((section) => sectionListTemplate(lineColor, section))
      .join('');
  }

  render(token, stationList, lineList) {
    sectionListTemplate;
    $('main').innerHTML = token ? sectionsTemplate(stationList, lineList) : LOGIN_REQUIRED_TEMPLATE;
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
