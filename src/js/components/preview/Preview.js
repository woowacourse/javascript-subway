import { PAGE_TITLE, STORAGE } from '../../constants';
import { initSections } from '../../models/model';
import { $, $$ } from '../../utils/dom';
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
    this.#sections = Object.values(sections)[0].sections;
  }

  getPageInfo() {
    console.log(this.#sections);
    return {
      title: PAGE_TITLE.MAP,
      contents: {
        main: previewTemplate(this.#sections),
      },
    };
  }

  initDOM() {
    this._bindEvent();
  }

  _bindEvent() {
    this._bindSelectPreviewEvent();
  }

  _bindSelectPreviewEvent() {
    $("form[name='preview']").addEventListener('change', e => {
      this._selectPreviewLine(e);
    });
  }

  _selectPreviewLine(e) {
    const id = e.target.value;
    $('#preview-list').innerHTML = previewLineTemplate(this.#sections[id]);
    console.log();
    const color = getComputedStyle(
      $('#preview-list .preview-line-item:first-child .line'),
    )['background-color'];

    e.target.setAttribute('style', `border-color:${color}`);
    $$('#preview-list .preview-line-item .line span').forEach($span => {
      $span.setAttribute('style', `border-color:${color}`);
    });
  }
}

export default Preview;
