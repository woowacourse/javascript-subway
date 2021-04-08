import { httpClient } from '../../api/httpClient';
import { getStationListTemplate } from '../../templates/stations';
import { ELEMENT, TYPE_JSON } from '../../utils/constants';
import { validateName } from '../../validators/validation';

export default class AddStation {
  constructor(props) {
    this.props = props;
  }

  async handleCreateStationForm(e, $stationListWrapper) {
    e.preventDefault();

    const stationName = e.target[ELEMENT.STATION_NAME].value;

    try {
      validateName(stationName);
    } catch (error) {
      alert(error.message);
      return;
    }

    const stationData = await httpClient.post({
      path: '/stations',
      body: { name: stationName },
      returnType: TYPE_JSON,
    });
    if (!stationData) return;

    this.props.userDataManager.setStationData(stationData);
    this.renderAddedStation({ stationName, $stationListWrapper });
    e.target[ELEMENT.STATION_NAME].value = '';
    this.props.userDataManager.cleanCacheStationListTemplate();
  }

  renderAddedStation({ stationName, $stationListWrapper }) {
    $stationListWrapper.insertAdjacentHTML('beforeend', getStationListTemplate(stationName));
  }
}
