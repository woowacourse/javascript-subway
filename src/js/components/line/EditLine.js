import { httpClient } from '../../api/httpClient';
import { getLineEditModalTemplate, getLineListTemplate } from '../../templates/lines';
import { ELEMENT } from '../../utils/constants';
import { $ } from '../../utils/dom';
import { closeModal, openModal } from '../../utils/modal';
import { validateEditLine } from '../../validators/validation';

export default class EditLine {
  constructor(props) {
    this.props = props;
    this.selectedLineColor = '';
    this.lineNameInEdit = '';
    this.lineColorInEdit = '';
  }

  selectDom() {
    this.$modal = $(`.${ELEMENT.MODAL}`);
  }

  selectModalDom() {
    this.$selectedColor = $(`.${ELEMENT.SELECTED_COLOR}`);
  }

  handleColorSelector(e) {
    if (!e.target.classList.contains(ELEMENT.COLOR_OPTION)) return;

    const colorTemplate = e.target.outerHTML;
    const [lineColor] = e.target.classList;

    this.$selectedColor.querySelector(`.${ELEMENT.COLOR_OPTION}`).remove();
    this.$selectedColor.insertAdjacentHTML('afterbegin', colorTemplate);
    this.selectedLineColor = lineColor;
  }

  handleLineEditButton(e) {
    const { lineName } = e.target.closest(`.${ELEMENT.LINE_LIST_ITEM}`).dataset;
    const editTargetLineData = this.props.userDataManager.getTargetLineDataForEdit(lineName);

    this.lineNameInEdit = lineName;
    this.selectedLineColor = '';
    this.lineColorInEdit = this.props.userDataManager.getTargetLineData(lineName).color;
    this.showLineEditModal(editTargetLineData);
  }

  showLineEditModal(lineData) {
    this.$modal.innerHTML = getLineEditModalTemplate(lineData);
    this.props.initModal();
    openModal(this.$modal);
  }

  async handleEditLineForm(e) {
    e.preventDefault();

    const newLineName = e.target[ELEMENT.SUBWAY_LINE_NAME].value;
    const newColor = this.selectedLineColor || this.lineColorInEdit;
    const lineIdInEdit = this.props.userDataManager.getTargetLineData(this.lineNameInEdit).id;

    try {
      validateEditLine({
        lineName: newLineName,
        selectedLineColor: this.selectedLineColor,
        lineColorList: this.props.userDataManager.getLineColors(),
      });
    } catch (error) {
      alert(error.message);
      return;
    }

    const nameEditSuccess = await httpClient.put({
      path: `/lines/${lineIdInEdit}`,
      body: { name: newLineName, color: newColor },
    });
    if (!nameEditSuccess) return;

    this.props.userDataManager.editLineData({ oldLineName: this.lineNameInEdit, newLineName, newColor });
    this.renderEditedLine(newLineName, newColor);
    this.props.userDataManager.cleanCacheLineListTemplate();
    closeModal(this.$modal);
  }

  renderEditedLine(newLineName, newLineColor) {
    const $lineListItem = $(`[data-line-name="${this.lineNameInEdit}"]`);
    $lineListItem.outerHTML = getLineListTemplate({ lineName: newLineName, lineColor: newLineColor });
  }
}
