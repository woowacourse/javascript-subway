import { ALERT_MESSAGE, SELECTOR_ID, STATE_KEY } from '../constants';
import { state } from '../store.js';
import { isDuplicatedStationNameExist, isProperStationNameLength } from '../validators/station.js';
import { requestStationRegistration } from '../api/station.js';

function delegateStationSubmitEvent(event) {
  const { target } = event;
  if (target.id === SELECTOR_ID.STATION_FORM) {
    onStationFormSubmit(target);
  }
}

function onStationFormSubmit(target) {
  const { stationName: stationNameInput } = target;
  const stationList = state.get(STATE_KEY.STATION_LIST);
  if (!isProperStationNameLength(stationNameInput.value)) {
    alert(ALERT_MESSAGE.NOT_PROPER_STATION_NAME_LENGTH);
    return;
  }
  if (isDuplicatedStationNameExist(stationNameInput.value, stationList)) {
    alert(ALERT_MESSAGE.DUPLICATED_STATION_NAME_EXIST);
    return;
  }
  requestStationRegistration(stationNameInput.value)
    .then(({ id, name }) => {
      state.update(STATE_KEY.STATION_LIST, [...stationList, { id, name }]);
    })
    .catch(error => {
      console.log(error);
      alert(ALERT_MESSAGE.STATION_REGISTRATION_FAILED);
    });
}

export default delegateStationSubmitEvent;
