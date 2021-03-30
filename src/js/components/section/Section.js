import { lineAPI } from '../../../../api/line.js';
import {
  ERROR_MESSAGE,
  PAGE_TITLE,
  PATH,
  SELECTOR,
  STORAGE,
} from '../../constants.js';
import { $ } from '../../utils/dom.js';
import { getLocalStorageItem } from '../../utils/storage.js';
import {
  sectionsTemplate,
  sectionTemplate,
  modalTemplate,
} from './sectionTemplate.js';
class Section {
  #userAccessToken;
  #sections;
  #props;

  constructor(props) {
    this.#props = props;
    this.#userAccessToken = null;
    this.#sections = {};
  }

  async init() {
    this.#userAccessToken = getLocalStorageItem(STORAGE.USER_ACCESS_TOKEN);
    await this._initSections();
  }

  getPageInfo() {
    return {
      title: PAGE_TITLE.SECTIONS,
      contents: {
        main: sectionsTemplate(this.#sections),
        modal: modalTemplate(),
      },
    };
  }

  initDOM() {
    this.$sectionSelectForm = $(SELECTOR.SECTION_SELECT_FORM);
    this._bindEvent();
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
  }

  _bindSelectLineEvent() {
    this.$sectionSelectForm.addEventListener('change', e => {
      if (e.target.tagName !== 'SELECT') return;

      this._handleSelectLine(e);
    });
  }

  _handleSelectLine({ target }) {
    const id = target.value;
    const { stations, color } = this.#sections[id];

    target.className = color;
    $('#section-list').innerHTML = stations.map(sectionTemplate).join('');
  }
}

export default Section;
