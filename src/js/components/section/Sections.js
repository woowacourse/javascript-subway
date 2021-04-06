import UserDataManager from '../../model/UserDataManager';
import AddSection from './AddSection';
import RemoveSection from './RemoveSection';
import { $ } from '../../utils/dom';
import { ELEMENT, SUCCESS, TYPE_JSON } from '../../utils/constants';
import { httpClient } from '../../api/httpClient';
import RenderSection from './renderSection';

export default class Sections {
  constructor() {
    this.userDataManager = new UserDataManager();
    this.addSection = new AddSection({
      userDataManager: this.userDataManager,
      updateTargetLineData: this.updateTargetLineData.bind(this),
    });
    this.removeSection = new RemoveSection({
      userDataManager: this.userDataManager,
      updateTargetLineData: this.updateTargetLineData.bind(this),
    });
    this.renderSection = new RenderSection({ userDataManager: this.userDataManager });
  }

  init() {
    const [firstLineData] = this.userDataManager.lines;
    this.selectDom();
    this.bindEvent();
    firstLineData && this.renderSection.renderFirstScreen(firstLineData);
  }

  selectDom() {
    this.$createSectionButton = $(`.${ELEMENT.CREATE_SECTION_BUTTON}`);
    this.$modalSectionForm = $(`.${ELEMENT.MODAL_SECTION_FORM}`);
    this.renderSection.selectDom();
    this.addSection.selectDom();
  }

  bindEvent() {
    this.$createSectionButton.addEventListener('click', () => this.addSection.handleCreateSectionButton());
    this.$modalSectionForm.addEventListener('submit', (e) => this.addSection.handleCreateSectionForm(e));
    this.renderSection.$lineOptionsWrapper.addEventListener('change', (e) => this.renderSection.handleChangeSection(e));
    this.renderSection.$lineListWrapper.addEventListener('click', (e) => {
      if (e.target.classList.contains(ELEMENT.SECTION_LIST_ITEM_REMOVE_BUTTON)) {
        this.removeSection.handleRemoveSection(e, this.renderSection.$lineOptionsWrapper.value);
      }
    });
  }

  async updateTargetLineData({ lineId, lineName }) {
    const targetLineList = await httpClient.get({ path: `/lines/${lineId}`, returnType: TYPE_JSON });
    if (!targetLineList) return;

    this.userDataManager.updateTargetLineData(targetLineList);
    this.renderSection.renderStationListInTargetLine(lineName);

    return SUCCESS;
  }
}
