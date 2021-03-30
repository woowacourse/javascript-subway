import { lineAPI } from '../../../../api/line.js';
import { stationAPI } from '../../../../api/station.js';
import {
  ERROR_MESSAGE,
  PAGE_TITLE,
  PATH,
  SELECTOR,
  STORAGE,
} from '../../constants.js';
import { $ } from '../../utils/dom.js';
import { getLocalStorageItem } from '../../utils/storage.js';
import SectionModal from './SectionModal.js';
import {
  sectionsTemplate,
  sectionTemplate,
  modalTemplate,
} from './sectionTemplate.js';
class Section {
  #userAccessToken;
  #stations;
  #sections;
  #props;
  #modal;

  constructor(props) {
    this.#props = props;
    this.#userAccessToken = null;
    this.#stations = {};
    this.#sections = {};
    this.#modal = new SectionModal();
  }

  async init() {
    this.#userAccessToken = getLocalStorageItem(STORAGE.USER_ACCESS_TOKEN);
    await this._initStations();
    await this._initSections();
  }

  getPageInfo() {
    return {
      title: PAGE_TITLE.SECTIONS,
      contents: {
        main: sectionsTemplate(this.#sections),
        modal: modalTemplate(this.#stations),
      },
    };
  }

  initDOM() {
    this.$sectionSelectForm = $(SELECTOR.SECTION_SELECT_FORM);
    this._bindEvent();
  }

  async _initStations() {
    try {
      this.#stations = {};

      const stations = await stationAPI.getStations(this.#userAccessToken);
      stations.forEach(({ id, ...rest }) => {
        this.#stations[id] = rest;
      });
    } catch {
      alert(ERROR_MESSAGE.LOAD_STATION_FAILED);
    }
  }

  async _initSections() {
    try {
      this.#sections = {};

      const sections = await lineAPI.getLines(this.#userAccessToken);

      if (Object.keys(sections).length === 0) {
        alert('관리할 노선 정보가 없습니다. 먼저 노선을 만들어주세요!');
        this.#props.switchURL(PATH.LINES);
        return;
      }

      sections.forEach(({ id, name, color, stations }) => {
        this.#sections[id] = { name, color, stations };
      });
    } catch {
      alert(ERROR_MESSAGE.LOAD_LINE_FAILED);
    }
  }

  _bindEvent() {
    this._bindSelectLineEvent();
    this._bindAddSectionEvent();
  }

  _bindSelectLineEvent() {
    this.$sectionSelectForm.addEventListener('change', e => {
      if (e.target.tagName !== 'SELECT') return;

      this._handleSelectLine(e);
    });
  }

  _bindAddSectionEvent() {
    $('.create-section-btn').addEventListener('click', e => {
      this.#modal.handleSectionOpen({
        sectionInfo: this._getSelectedSectionInfo(),
      });
    });
  }

  _handleSelectLine({ target }) {
    const id = target.value;
    const { stations, color } = this.#sections[id];

    target.className = color;
    $('#section-list').innerHTML = stations.map(sectionTemplate).join('');
  }

  _getSelectedSectionInfo() {
    // const keyLine;
    // this.#sections[keyLine]; // station들에 대한정보
  }
}

export default Section;
