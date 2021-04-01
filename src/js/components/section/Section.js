import { lineAPI } from '../../../../api/line.js';
import { sectionAPI } from '../../../../api/section.js';
import { stationAPI } from '../../../../api/station.js';
import {
  CONFIRM_MESSAGE,
  ERROR_MESSAGE,
  PAGE_TITLE,
  PATH,
  SELECTOR,
  STORAGE,
  SUCCESS_MESSAGE,
} from '../../constants.js';
import { $ } from '../../utils/dom.js';
import { showSnackbar } from '../../utils/snackbar.js';
import { getLocalStorageItem } from '../../utils/storage.js';
import SectionModal from './SectionModal.js';
import {
  sectionsTemplate,
  sectionTemplate,
  modalTemplate,
} from './sectionTemplate.js';
class Section {
  #userAccessToken;
  #selectedLineId;
  #stations;
  #sections;
  #props;
  #modal;

  constructor(props) {
    this.#props = props;
    this.#userAccessToken = null;
    this.#selectedLineId = null;
    this.#stations = {};
    this.#sections = {};
    this.#modal = new SectionModal({
      updateSections: this.updateSections.bind(this),
    });
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
        modal: modalTemplate(this.#stations, this.#sections),
      },
    };
  }

  initDOM() {
    this.#modal.init({
      sections: this.#sections,
      userAccessToken: this.#userAccessToken,
    });
    this.$sectionSelectForm = $(SELECTOR.SECTION_SELECT_FORM);
    this.$sectionList = $(SELECTOR.SECTION_LIST);
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
    this._bindRemoveSectionEvent();
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
        sections: this.#sections,
      });
    });
  }

  _bindRemoveSectionEvent() {
    this.$sectionList.addEventListener('click', e => {
      if (e.target.classList.contains('delete-button')) {
        this._handleRemoveSection(e);
      }
    });
  }

  _handleSelectLine({ target }) {
    this.#selectedLineId = target.value;
    const { stations, color } = this.#sections[this.#selectedLineId];

    target.className = color;
    $('#section-list').innerHTML = stations.map(sectionTemplate).join('');
  }

  async _handleRemoveSection(e) {
    if (!confirm(CONFIRM_MESSAGE.REMOVE)) return;

    try {
      const { $sectionItem, id } = this._getSelectedSectionInfo(e);

      await sectionAPI.deleteSection({
        userAccessToken: this.#userAccessToken,
        lineId: this.#selectedLineId,
        stationId: id,
      });

      this.#sections[this.#selectedLineId].stations = this.#sections[
        this.#selectedLineId
      ].stations.filter(station => station.id !== Number(id));

      $sectionItem.remove();
      showSnackbar(SUCCESS_MESSAGE.REMOVE_SECTION);
    } catch (res) {
      const message = await res.text();
      showSnackbar(message ? message : ERROR_MESSAGE.REMOVE_SECTION_FAILED);
    }
  }

  updateSections(info) {
    const {
      ['line-select']: lineId,
      ['prev-station']: upStationId,
      ['next-station']: downStationId,
    } = info;

    const sectionStations = this.#sections[lineId].stations;
    const idx = sectionStations.findIndex(
      ({ id }) => id === Number(upStationId),
    );

    const newStation = {
      id: Number(downStationId),
      ...this.#stations[downStationId],
    };

    if (idx < 0) {
      sectionStations.unshift(newStation);
    } else {
      sectionStations.splice(idx + 1, 0, newStation);
    }

    if (lineId === this.#selectedLineId) {
      const stations = this.#sections[this.#selectedLineId].stations;
      $('#section-list').innerHTML = stations.map(sectionTemplate).join('');
    }
  }

  _getSelectedSectionInfo({ target }) {
    const $sectionItem = target.closest('[data-section-id]');
    const id = $sectionItem.dataset.sectionId;

    return { $sectionItem, id };
  }
}

export default Section;

// TODO : initStation, Section, Line model.js 로 분리
// 상수화. 특히 DOM
// 테스트 코드 짜기
// 시간 남으면 역과 역사이의 시간, 분 정도? (개인?)
