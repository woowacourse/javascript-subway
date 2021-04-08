import { httpClient } from '../../api/httpClient';
import { ELEMENT, REMOVE_CONFIRM_MESSAGE } from '../../utils/constants';
import { $ } from '../../utils/dom';

export default class RemoveStation {
  constructor(props) {
    this.props = props;
  }

  async handleStationNameRemoveButton(e) {
    if (!window.confirm(REMOVE_CONFIRM_MESSAGE)) return;

    const { stationName } = e.target.closest(`.${ELEMENT.STATION_LIST_ITEM}`).dataset;
    const $stationListItem = $(`[data-station-name="${stationName}"]`);
    const stationId = this.props.userDataManager.getTargetStationId(stationName);

    const removeSuccess = await httpClient.delete({ path: `/stations/${stationId}` });
    if (!removeSuccess) return;

    $stationListItem.remove();
    this.props.userDataManager.removeStation(stationName);
    this.props.userDataManager.cleanCacheStationListTemplate();
  }
}
