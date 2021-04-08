import { checkSectionValid } from './sectionValidator';
import { sectionStationTemplate } from './sectionTemplate';

import { FORM, SELECTOR, SUCCESS_MESSAGE } from '../../constants';
import { sectionAPI } from '../../../../api/section';
import { $, clearForm, getFormData } from '../../utils/dom';
import { showSnackbar } from '../../utils/snackbar';
import { bindModalCloseEvent, closeModal, showModal } from '../../utils/modal';

class SectionModal {
  #props;
  #sections;
  #userAccessToken;

  constructor(props) {
    this.#props = props;
  }

  init({ sections, userAccessToken }) {
    this.#sections = sections;
    this.#userAccessToken = userAccessToken;
    this._initDOM();
  }

  _initDOM() {
    this.$addSectionForm = $(SELECTOR.ADD_SECTION);
    this.$prevStationSelect = $(`select[name=${FORM.SECTION.PREV_STATION}]`);
    this.$lineSelect = $(`select[name='${FORM.SECTION.LINE_SELECT}']`);
    bindModalCloseEvent();
    this._bindSelectLineEvent();
    this._bindSectionFormEvent();
  }

  _bindSelectLineEvent() {
    this.$addSectionForm.addEventListener('change', e => {
      if (e.target.tagName !== 'SELECT') return;

      if (e.target.name === FORM.SECTION.LINE_SELECT) {
        this._handleSelectLine(e);
      }
    });
  }

  _bindSectionFormEvent() {
    this.$addSectionForm.addEventListener('submit', e => {
      this._handleAddSectionClose(e);
    });
  }

  openSectionModal({ sections }) {
    this.#sections = sections;
    showModal();
  }

  _handleSelectLine({ target }) {
    const id = target.value;
    const { stations, color } = this.#sections[id];

    target.className = color;
    this.$prevStationSelect.innerHTML = sectionStationTemplate(stations);
  }

  async _handleAddSectionClose(e) {
    e.preventDefault();

    const sectionInfo = getFormData(e.target.elements);
    const message = checkSectionValid(sectionInfo);
    if (message) {
      alert(message);
      return;
    }

    await this._addSection(sectionInfo);
    closeModal();
  }

  async _addSection(sectionInfo) {
    try {
      const {
        [FORM.SECTION.LINE_SELECT]: lineId,
        [FORM.SECTION.PREV_STATION]: upStationId,
        [FORM.SECTION.NEXT_STATION]: downStationId,
        distance,
        arrival: duration,
      } = sectionInfo;

      await sectionAPI.addSection({
        userAccessToken: this.#userAccessToken,
        sectionInfo: { lineId, upStationId, downStationId, distance, duration },
      });

      clearForm(this.$addSectionForm);
      this.$lineSelect.className = '';

      this.#props.modifySection(sectionInfo);
      showSnackbar(SUCCESS_MESSAGE.ADD_SECTION);
    } catch (res) {
      const message = await res.text();
      showSnackbar(message);
    }
  }
}

export default SectionModal;
