import { SELECTOR } from '../../constants/constants.js';
import { $, hide, show } from '../../utils/dom.js';
import { colorOptions } from '../../utils/mock.js';
import { modalTemplate } from './template.js';
import LineCreateModal from './LineCreateModal.js';
import LineEditModal from './LineEditModal.js';

export default class LineModal {
  constructor(store) {
    this.store = store;
    this.$root = $(SELECTOR.MODAL);
    this.createModal = new LineCreateModal(this.store);
    this.editModal = new LineEditModal(this.store);

    this.state = {
      color: '',
      name: '',
      upStationId: 0,
      downStationId: 0,
      distance: 0,
      duration: 0,
    };
  }

  init() {
    this.$root.innerHTML = modalTemplate;
    this.selectDOM();
    this.bindEvents();
  }

  selectDOM() {
    this.$modalCloseButton = $(SELECTOR.MODAL_CLOSE);
    this.$lineCreationForm = $(SELECTOR.LINE_CREATION_FORM);
    this.$lineNameInput = $(SELECTOR.LINE_NAME_INPUT);
    this.$lineDuplicatedWarning = $(SELECTOR.LINE_DUPLICATED_WARNING);
    this.$lineColorInput = $(SELECTOR.LINE_COLOR_INPUT);
    this.$lineColorSelector = $(SELECTOR.SUBWAY_LINE_COLOR_SELECTOR);
  }

  bindEvents() {
    this.$lineNameInput.addEventListener('focusout', this.checkNameDuplicated.bind(this));
    this.$lineColorSelector.addEventListener('click', this.handleColorSelect.bind(this));
    this.$lineCreationForm.addEventListener('submit', this.handleSubmit.bind(this));
    this.$modalCloseButton.addEventListener('click', this.close.bind(this));
    this.$root.addEventListener('mousedown', this.handleClickOutsideModal.bind(this));
    document.addEventListener('keydown', this.handleESCKey.bind(this));
  }

  open(lineID = '') {
    this.$root.classList.add('open');
    this.type = lineID ? 'edit' : 'create';

    if (this.type === 'create') {
      this.createModal.init();
    } else {
      this.line = this.store.lines.find((line) => line.id === Number(lineID));
      this.editModal.init(this.line);
    }

    this.resetForm();
    this.activateInput();
    this.setModalColorOptions();
  }

  resetForm() {
    this.$lineNameInput.setAttribute('placeholder', '노선 이름');
    this.$lineColorInput.setAttribute('placeholder', '색상을 아래에서 선택해주세요.');
    this.$lineNameInput.removeAttribute('value');
    this.$lineColorInput.removeAttribute('value');
    this.$lineCreationForm.reset();
    hide(this.$lineDuplicatedWarning);

    const prevColorOption = this.$lineColorSelector.querySelector('.selected');
    if (prevColorOption) {
      prevColorOption.classList.remove('selected');
    }
  }

  activateInput() {
    $(SELECTOR.LINE_NAME_INPUT).focus();

    if (this.type === 'create') {
      this.createModal.activateInput();
    } else {
      this.editModal.activateInput();
    }
  }

  setModalColorOptions() {
    this.$lineColorSelector.innerHTML = colorOptions.map(this.subwayLineColorOptionTemplate).join('');
  }

  checkNameDuplicated(event) {
    const name = event.target.value;

    if (this.type === 'edit') {
      if (this.editModal.isNameDuplicated(name)) {
        show(this.$lineDuplicatedWarning);
      } else {
        hide(this.$lineDuplicatedWarning);
      }
    } else {
      if (this.createModal.isNameDuplicated(name)) {
        show(this.$lineDuplicatedWarning);
      } else {
        hide(this.$lineDuplicatedWarning);
      }
    }
  }

  subwayLineColorOptionTemplate(color, index) {
    const hasNewLine = (index + 1) % 10 === 0;
    return `<button type="button" class="color-option bg-${color}"></button> ${hasNewLine ? '<br/>' : ''}`;
  }

  handleColorSelect(event) {
    if (event.target.type !== 'button') return;

    const color = [...event.target.classList].find((className) => className.startsWith('bg-'));
    $(SELECTOR.LINE_COLOR_INPUT).setAttribute('value', color);

    $(SELECTOR.COLOR_OPTION).forEach((option) => {
      if (option.classList.contains(color)) {
        option.classList.add('selected');
      } else {
        option.classList.remove('selected');
      }
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const formData = event.target.elements;

    if (this.type === 'create') {
      await this.createModal.handleSubmit(formData);
      this.close();
    } else {
      await this.editModal.handleSubmit(formData);
      this.close();
    }
  }

  close() {
    this.$root.classList.remove('open');
  }

  handleESCKey(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  handleClickOutsideModal(event) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }
}
