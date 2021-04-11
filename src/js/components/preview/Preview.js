import { PAGE_TITLE, SELECTOR, STORAGE } from '../../constants';
import { initSections } from '../../models/model';
import { $, $$, setStyleAttribute } from '../../utils/dom';
import { getLocalStorageItem } from '../../utils/storage';
import { previewLineTemplate, previewTemplate } from './previewTemplate';

class Preview {
  #userAccessToken;
  #sections;

  constructor() {
    this.#userAccessToken = null;
    this.#sections = {};
  }

  async init() {
    this.#userAccessToken = getLocalStorageItem(STORAGE.USER_ACCESS_TOKEN);
    const sections = await initSections(this.#userAccessToken);

    this.#sections =
      Object.keys(sections).length > 0
        ? Object.values(sections)[0].sections
        : {};
  }

  getPageInfo() {
    return {
      title: PAGE_TITLE.MAP,
      contents: {
        main: previewTemplate(this.#sections),
      },
    };
  }

  initDOM() {
    this.$previewForm = $(SELECTOR.PREVIEW_FORM);
    this.$previewList = $(SELECTOR.PREVIEW_LIST);
  }

  bindEvent() {
    this._bindSelectPreviewEvent();
  }

  _bindSelectPreviewEvent() {
    this.$previewForm.addEventListener('change', e => {
      this._selectPreviewLine(e);
    });
  }

  _selectPreviewLine({ target }) {
    const id = target.value;
    this.$previewList.innerHTML = previewLineTemplate(this.#sections[id]);

    const color = getComputedStyle($(SELECTOR.PREVIEW_LIST_LINE))[
      'background-color'
    ];
    setStyleAttribute(`border-color:${color}`, target);
    $$('#preview-list .preview-line-item .line span').forEach($span => {
      setStyleAttribute(`border-color:${color}`, $span);
    });
  }
}

export default Preview;
