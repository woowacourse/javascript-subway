import {
  bindModalCloseEvent,
  onModalClose,
  onModalShow,
} from '../../utils/modal';
import { SELECTOR, SUCCESS_MESSAGE } from '../../constants';
import { sectionStationTemplate } from './sectionTemplate';
import { $, clearForm, getFormData } from '../../utils/dom';
import { checkSectionValid } from './sectionValidator';
import { sectionAPI } from '../../../../api/section';
import { showSnackbar } from '../../utils/snackbar';
class SectionModal {
  #sections;
  #userAccessToken;

  constructor({ updateSections }) {
    this.updateSections = updateSections;
  }

  init({ sections, userAccessToken }) {
    this.#sections = sections;
    this.#userAccessToken = userAccessToken;
    this._initDOM();
  }

  _initDOM() {
    this.$addSectionForm = $(SELECTOR.ADD_SECTION);
    this._bindEvent();
  }

  _bindEvent() {
    bindModalCloseEvent();
    this._bindSelectLineEvent();
    this._bindSectionFormEvent();
  }

  _bindSelectLineEvent() {
    this.$addSectionForm.addEventListener('change', e => {
      if (e.target.tagName !== 'SELECT') return;

      if (e.target.name === 'line-select') {
        this._handleSelectLine(e);
      }
    });
  }

  _bindSectionFormEvent() {
    this.$addSectionForm.addEventListener('submit', e => {
      this._handleAddSectionClose(e);
    });
  }

  handleSectionOpen({ sections }) {
    this.#sections = sections;
    onModalShow();
  }

  _handleSelectLine({ target }) {
    const id = target.value;
    const { stations, color } = this.#sections[id];

    target.className = color;
    $('select[name="prev-station"]').innerHTML = sectionStationTemplate(
      stations,
    );
  }

  async _handleAddSectionClose(e) {
    e.preventDefault();
    const sectionInfo = getFormData(e.target.elements);
    const message = checkSectionValid(sectionInfo);
    if (message) {
      alert(message);
      return;
    }

    try {
      await sectionAPI.addSection({
        userAccessToken: this.#userAccessToken,
        sectionInfo,
      });

      clearForm(this.$addSectionForm);
      $("select[name='line-select']").className = '';
      this.updateSections(sectionInfo); // TODO : 다른 모든 update 메서드에서도 모델과 뷰 바꿔주게끔 리팩토링
      showSnackbar(SUCCESS_MESSAGE.ADD_SECTION);
      onModalClose();
    } catch (res) {
      const message = await res.text();
      showSnackbar(message);
    }
  }
}

export default SectionModal;
