import Component from '../../core/Component.js';
import { sectionListTemplate, sectionsTemplate } from './template.js';
import { $ } from '../../utils/index.js';
import { LOGIN_REQUIRED_TEMPLATE } from '../../constants/index.js';
import { getStationList, getLineList, getSectionData } from '../../service/index.js';

export default class Sections extends Component {
  #token;
  #lineId;
  constructor() {
    super();
    this.#token;
    this.#lineId;
  }

  selectDOM() {
    this.$lineSelect = $('#line-select');
    this.$sectionListContainer = $('#section-list-container');
  }

  bindEvent() {
    this.$lineSelect.addEventListener('change', this.handleLineSelect.bind(this));
  }

  async handleLineSelect({ target }) {
    this.#lineId = target.value;
    const sectionList = await getSectionData({ token: this.#token, id: this.#lineId });

    this.$sectionListContainer.innerHTML = sectionList
      .map((section, index) => sectionListTemplate(section, index))
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
