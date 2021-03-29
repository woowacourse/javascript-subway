import Component from '../../core/Component.js';
import { sectionListTemplate, sectionsTemplate } from './template.js';
import { $, showSnackbar } from '../../utils/index.js';
import { LOGIN_REQUIRED_TEMPLATE, SNACKBAR_MESSAGE } from '../../constants/index.js';
import { getStationList, getLineList, getSectionData, getCreatedSectionData } from '../../service/index.js';

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
  }

  bindEvent() {
    this.$lineSelect.addEventListener('change', this.handleLineSelect.bind(this));
    this.$createSectionButton.addEventListener('click', this.handleModalOpen.bind(this));
    this.$modalCloseButton.addEventListener('click', this.handleModalClose.bind(this));
    this.$modalForm.addEventListener('submit', this.handleSectionForm.bind(this));
  }

  async handleSectionForm(e) {
    e.preventDefault();

    this.#lineId = e.target.elements['modal-line-select'].value;
    const upStationId = e.target.elements['previous-station-select'].value;
    const downStationId = e.target.elements['next-station-select'].value;
    const distance = e.target.elements['distance-input'].value;
    const duration = e.target.elements['duration-input'].value;

    const createdSectionData = await getCreatedSectionData({
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
    const stationList = await getSectionData({ token: this.#token, id: this.#lineId });

    this.$sectionListContainer.innerHTML = stationList
      .map((station, index) => sectionListTemplate(station, index))
      .join('');
  }

  render(token, stationList, lineList) {
    sectionListTemplate;
    $('main').innerHTML = token ? sectionsTemplate(stationList, lineList) : LOGIN_REQUIRED_TEMPLATE;
  }

  async load(token = '') {
    const stationList = await getStationList(token);
    const lineList = await getLineList(token);

    this.#token = token;
    this.render(token, stationList, lineList);

    if (token) {
      this.selectDOM();
      this.bindEvent();
    }
  }
}
