import { httpClient } from '../../api/httpClient';
import { REMOVE_CONFIRM_MESSAGE } from '../../utils/constants';

export default class RemoveSection {
  constructor(props) {
    this.props = props;
  }

  async handleRemoveSection(e, lineName) {
    if (!window.confirm(REMOVE_CONFIRM_MESSAGE)) return;

    const lineId = this.props.userDataManager.getTargetLineData(lineName).id;
    const removeTargetStation = e.target.dataset.stationName;
    const removeTargetStationId = this.props.userDataManager.getTargetStationId(removeTargetStation);

    const removeSuccess = await httpClient.delete({
      path: `/lines/${lineId}/sections?stationId=${removeTargetStationId}`,
    });
    if (!removeSuccess) return;

    await this.props.updateTargetLineData({ lineId, lineName });
  }
}
