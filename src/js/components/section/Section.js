import SectionModal from './SectionModal.js';
import {
  sectionsTemplate,
  sectionTemplate,
  modalTemplate,
} from './sectionTemplate.js';

import { initSections, initStations } from '../../models/model.js';

import { sectionAPI } from '../../../../api/section.js';
import { $ } from '../../utils/dom.js';
import { showSnackbar } from '../../utils/snackbar.js';
import { getLocalStorageItem } from '../../utils/storage.js';
import {
  CLASS_NAME,
  CONFIRM_MESSAGE,
  ERROR_MESSAGE,
  FORM,
  PAGE_TITLE,
  SELECTOR,
  STORAGE,
  SUCCESS_MESSAGE,
} from '../../constants.js';

class Section {
  #userAccessToken;
  #selectedLineId;
  #stations;
  #sections;
  #modal;

  constructor() {
    this.#userAccessToken = null;
    this.#selectedLineId = null;
    this.#stations = {};
    this.#sections = {};
    this.#modal = new SectionModal({
      modifySection: this.modifySection.bind(this),
    });
  }

  async init() {
    this.#userAccessToken = getLocalStorageItem(STORAGE.USER_ACCESS_TOKEN);
    this.#stations = await initStations(this.#userAccessToken);
    this.#sections = await initSections(this.#userAccessToken);
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
    $(SELECTOR.CREATE_SECTION_BUTTON).addEventListener('click', e => {
      this.#modal.handleSectionOpen({
        sections: this.#sections,
      });
    });
  }

  _bindRemoveSectionEvent() {
    this.$sectionList.addEventListener('click', e => {
      if (e.target.classList.contains(CLASS_NAME.DELETE_BUTTON)) {
        this._handleRemoveSection(e);
      }
    });
  }

  _handleSelectLine({ target }) {
    this.#selectedLineId = target.value;
    const { stations, color } = this.#sections[this.#selectedLineId];

    target.className = color;
    $(SELECTOR.SECTION_LIST).innerHTML = stations.map(sectionTemplate).join('');
  }

  async _handleRemoveSection(e) {
    if (!confirm(CONFIRM_MESSAGE.REMOVE)) return;

    try {
      const sectionInfo = this._getSelectedSectionInfo(e);

      await sectionAPI.deleteSection({
        userAccessToken: this.#userAccessToken,
        lineId: this.#selectedLineId,
        stationId: sectionInfo.id,
      });

      this._removeSection(sectionInfo);
      showSnackbar(SUCCESS_MESSAGE.REMOVE_SECTION);
    } catch (res) {
      const message = await res.text();
      showSnackbar(message ? message : ERROR_MESSAGE.REMOVE_SECTION_FAILED);
    }
  }

  _getSelectedSectionInfo({ target }) {
    const $sectionItem = target.closest('[data-section-id]');
    const id = $sectionItem.dataset.sectionId;

    return { $sectionItem, id };
  }

  modifySection(info) {
    const {
      [FORM.SECTION.LINE_SELECT]: lineId,
      [FORM.SECTION.PREV_STATION]: upStationId,
      [FORM.SECTION.NEXT_STATION]: downStationId,
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

  _removeSection({ id, $sectionItem }) {
    this.#sections[this.#selectedLineId].stations = this.#sections[
      this.#selectedLineId
    ].stations.filter(station => station.id !== Number(id));
    $sectionItem.remove();
  }
}

export default Section;

// TODO : initStation, Section, Line model.js 로 분리
// 상수화. 특히 DOM
// 테스트 코드 짜기
// 시간 남으면 역과 역사이의 시간, 분 정도? (개인?)
