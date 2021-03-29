import { $ } from '../../utils/dom.js';
import popSnackbar from '../../utils/snackbar.js';
import { SELECTOR, MESSAGES } from '../../constants/constants.js';
import { contentTemplate, modalTemplate } from './template.js';
import { deleteLineRequest } from '../../request.js';
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
    this.$lineList.addEventListener('click', this.handleItemButtons.bind(this));
    $(SELECTOR.MODAL).addEventListener('createLine', this.addLine.bind(this));
  }

  addLine(event) {
    this.$lineList.insertAdjacentHTML('afterbegin', event.detail.line.toListItemTemplate());

    const lines = this.store.lines;
    const newLines = [event.detail.line, ...lines];
    this.store.lines = newLines;
  }

  async handleItemButtons(event) {
    if (event.target.type !== 'button') return;

    if (event.target.dataset.action === 'edit') {
      // modal open
    }

    if (event.target.dataset.action === 'delete') {
      await this.deleteLineItem(event);
    }
  }

  async deleteLineItem(event) {
    const lineItem = event.target.closest('li');
    const itemDivider = lineItem.nextElementSibling;
    const lineName = lineItem.dataset.lineName;
    const lineID = Number(lineItem.dataset.lineId);
    const accessToken = this.store.userAuth.accessToken;

    if (!window.confirm(MESSAGES.LINE_DELETE.CONFIRM(lineName))) return;

    try {
      await deleteLineRequest(lineID, accessToken);

      lineItem.remove();
      if (!itemDivider.matches('hr')) return;
      itemDivider.remove();

      this.deleteLineData(lineID);
      popSnackbar(MESSAGES.LINE_DELETE.SUCCESS(lineName));
    } catch (error) {
      console.error(error);
      popSnackbar(MESSAGES.LINE_DELETE.FAIL);
    }
  }

  deleteLineData(lineId) {
    const lines = this.store.lines;
    const updatedLines = lines.filter((line) => line.id !== lineId);

    this.store.lines = updatedLines;
  }
}
