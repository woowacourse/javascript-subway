import { $ } from '../utils/dom';
import { selectedColorTemplate } from '../templates/lines';

class Lines {
  constructor() {}

  init() {
    this.selectDom();
    this.bindEvent();
  }

  selectDom() {
    this.$lineListWrapper = $('.line-list-wrapper');
    this.$modal = $('.modal');
    this.$modalClose = $('.modal-close');
    this.$colorSelector = $('.subway-line-color-selector');
    this.$selectedColor = $('.selected-color');
  }

  bindEvent() {
    this.$lineListWrapper.addEventListener('click', (e) => {
      if (e.target.classList.contains('create-line-btn')) {
        this.handleCreateLineButton(e);
      }
    });

    this.$colorSelector.addEventListener('click', (e) => {
      if (!e.target.classList.contains('color-option')) return;
      const colorTemplate = e.target.outerHTML;

      this.$selectedColor.querySelector('button').remove();
      this.$selectedColor.insertAdjacentHTML('afterbegin', colorTemplate);
    });
  }

  handleCreateLineButton() {
    this.$selectedColor.innerHTML = selectedColorTemplate();
    this.$modal.classList.add('open');
  }
}

export default Lines;
