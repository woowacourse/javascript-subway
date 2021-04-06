import { httpClient } from '../../api/httpClient';
import { ELEMENT, REMOVE_CONFIRM_MESSAGE } from '../../utils/constants';
import { $ } from '../../utils/dom';

export default class RemoveLine {
  constructor(props) {
    this.props = props;
  }

  async handleLineRemoveButton(e) {
    if (!window.confirm(REMOVE_CONFIRM_MESSAGE)) return;

    const { lineName } = e.target.closest(`.${ELEMENT.LINE_LIST_ITEM}`).dataset;
    const $lineListItem = $(`[data-line-name="${lineName}"]`);
    const lineId = this.props.userDataManager.getTargetLineData(lineName).id;

    const removeSuccess = await httpClient.delete({ path: `/lines/${lineId}` });
    if (!removeSuccess) return;

    $lineListItem.remove();
    this.props.userDataManager.removeLine(lineName);
    this.props.userDataManager.cleanCacheLineListTemplate();
  }
}
