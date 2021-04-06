import { $ } from '../../utils/dom';
import UserDataManager from '../../model/UserDataManager';
import { ELEMENT, TYPE_JSON } from '../../utils/constants';
import AddLine from './addLine';
import EditLine from './editLine';
import RemoveLine from './removeLine';
import { httpClient } from '../../api/httpClient';

export default class Lines {
  constructor() {
    this.userDataManager = new UserDataManager();
    this.addLine = new AddLine({ userDataManager: this.userDataManager, initModal: this.initModal.bind(this) });
    this.editLine = new EditLine({ userDataManager: this.userDataManager, initModal: this.initModal.bind(this) });
    this.removeLine = new RemoveLine({ userDataManager: this.userDataManager });
  }

  async init() {
    this.selectDom();
    this.bindEvent();
    !this.userDataManager.lineListTemplate && (await this.setLineListTemplate());
    this.renderLineList();
  }

  selectDom() {
    this.$createLineButton = $(`.${ELEMENT.CREATE_LINE_BUTTON}`);
    this.$lineListWrapper = $(`.${ELEMENT.LINE_LIST_WRAPPER}`);
    this.addLine.selectDom();
    this.editLine.selectDom();
  }

  bindEvent() {
    this.$createLineButton.addEventListener('click', () => this.addLine.handleCreateLineButton());
    this.$lineListWrapper.addEventListener('click', (e) => {
      if (e.target.classList.contains(ELEMENT.LINE_LIST_ITEM_EDIT_BUTTON)) {
        this.editLine.handleLineEditButton(e);
        return;
      }

      if (e.target.classList.contains(ELEMENT.LINE_LIST_ITEM_REMOVE_BUTTON)) {
        this.removeLine.handleLineRemoveButton(e);
      }
    });
  }

  renderLineList() {
    this.$lineListWrapper.innerHTML = this.userDataManager.lineListTemplate;
  }

  async setLineListTemplate() {
    const lineData = await httpClient.get({ path: `/lines`, returnType: TYPE_JSON });
    if (!lineData) return;

    this.userDataManager.setLineData(lineData);
    this.userDataManager.cacheLineListTemplate();
  }

  initModal() {
    this.selectModalDom();
    this.bindModalEvent();
  }

  selectModalDom() {
    this.$colorSelector = $(`.${ELEMENT.LINE_COLOR_SELECTOR}`);
    this.$modalLineForm = $(`.${ELEMENT.MODAL_LINE_FORM}`);
    this.editLine.selectModalDom();
  }

  bindModalEvent() {
    this.$colorSelector.addEventListener('click', (e) => this.editLine.handleColorSelector(e));
    this.$modalLineForm.addEventListener('submit', (e) => {
      if ($(`.${ELEMENT.ADD_MODAL}`)) {
        this.addLine.handleCreateLineForm(e, this.$lineListWrapper);

        return;
      }

      if ($(`.${ELEMENT.EDIT_MODAL}`)) {
        this.editLine.handleEditLineForm(e);
      }
    });
  }
}
