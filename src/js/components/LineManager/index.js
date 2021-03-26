import { $ } from '../../utils/dom.js';
import { SELECTOR } from '../../constants/constants.js';
import { contentTemplate, modalTemplate } from './template.js';
import LineModal from './LineModal.js';

export default class LineManager {
  constructor(store) {
    this.store = store;
    this.$content = $(SELECTOR.CONTENT);
    this.modal = new LineModal(this.store);
  }

  init() {
    this.render();
    this.selectDOM();
    this.bindEvents();
    this.modal.init();
  }

  render() {
    this.$content.innerHTML = contentTemplate;
    this.$lineList = $(SELECTOR.LINE_LIST);
    this.$lineList.innerHTML = this.store.lines.map((line) => line.toListItemTemplate()).join('');
  }

  selectDOM() {}

  bindEvents() {
    $(SELECTOR.CREATE_LINE_BUTTON).addEventListener('click', () => this.modal.open());
    $(SELECTOR.MODAL).addEventListener('createLine', this.addLine.bind(this));
  }

  addLine(event) {
    this.$lineList.insertAdjacentHTML('afterbegin', event.detail.line.toListItemTemplate());

    const lines = this.store.lines;
    const newLines = [event.detail.line, ...lines];
    this.store.lines = newLines;
  }
}
