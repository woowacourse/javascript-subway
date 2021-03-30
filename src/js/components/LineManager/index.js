import { $ } from '../../utils/dom.js';
import popSnackbar from '../../utils/snackbar.js';
import { SELECTOR, MESSAGES } from '../../constants/constants.js';
import { contentTemplate } from './template.js';
import { deleteLineRequest } from '../../request.js';
import LineModal from './LineModal.js';

export default class LineManager {
  constructor(store) {
    this.store = store;
    this.$content = $(SELECTOR.CONTENT);
    this.modal = new LineModal(this.store);
    this.bindModalEvents();
  }

  init() {
    this.render();
    this.bindEvents();
    this.modal.init();
  }

  render() {
    this.$content.innerHTML = contentTemplate;
    this.$lineList = $(SELECTOR.LINE_LIST);
    this.$lineList.innerHTML = this.store.lines.map((line) => line.toListItemTemplate()).join('');
  }

  bindEvents() {
    $(SELECTOR.CREATE_LINE_BUTTON).addEventListener('click', () => this.modal.open());
    this.$lineList.addEventListener('click', this.handleItemButtons.bind(this));
  }

  bindModalEvents() {
    $(SELECTOR.MODAL).addEventListener('createLine', this.addLine.bind(this));
    $(SELECTOR.MODAL).addEventListener('editLine', this.editLine.bind(this));
  }

  addLine(event) {
    this.$lineList.insertAdjacentHTML('afterbegin', event.detail.line.toListItemTemplate());
    this.store.lines = [event.detail.line, ...this.store.lines];
  }

  // TODO: 원본 배열 건드리지 않고 데이터 수정하기
  editLine(event) {
    const line = event.detail.line;
    const { name, color } = event.detail.data;

    line.name = name;
    line.color = color;
    line.modifiedDate = new Date();

    this.$lineList.innerHTML = this.store.lines.map((line) => line.toListItemTemplate()).join('');
  }

  async handleItemButtons(event) {
    if (event.target.type !== 'button') return;

    if (event.target.dataset.action === 'edit') {
      const lineID = event.target.closest('li').dataset.lineId;
      const line = this.store.lines.find((line) => line.id === Number(lineID));

      if (!line) return;

      this.modal.open(lineID);
    }

    if (event.target.dataset.action === 'delete') {
      await this.deleteLineItem(event);
    }
  }

  async deleteLineItem(event) {
    const lineItem = event.target.closest('li');
    const lineName = lineItem.dataset.lineName;
    const lineID = Number(lineItem.dataset.lineId);
    const itemDivider = lineItem.nextElementSibling;
    const accessToken = this.store.userAuth.accessToken;

    if (!window.confirm(MESSAGES.LINE_DELETE.CONFIRM(lineName))) return;

    try {
      await deleteLineRequest(lineID, accessToken);

      lineItem.remove();
      if (itemDivider.matches('hr')) {
        itemDivider.remove();
      }

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
