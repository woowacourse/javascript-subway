import { STATION } from '../../../constants/alertMessage';
import store from '../../../store';
import { updateStationNameEditModal } from '../viewController';
import { openModal } from '../../../utils/modal';
import { $ } from '../../../utils/dom';
import { requestDeleteStation } from '../../../api/station';
import { isStationInLines } from '../../../services/station';

const deleteStation = async target => {
  if (!window.confirm(STATION.DELETE_STATION_CONFIRM)) return;

  const $targetStation = target.closest('.js-station-list-item');
  const stationId = Number($targetStation.dataset.id);

  if (isStationInLines(stationId)) {
    alert('역을 삭제할 수 없습니다. 이미 노선에 등록된 역입니다.');
    return;
  }

  const result = await requestDeleteStation(stationId);
  if (!result.success) {
    alert(result.message);
    return;
  }
  store.station.delete(stationId);
  $targetStation.remove();

  alert(STATION.DELETE_STATION_SUCCESS);
};

const handleStationStatus = async ({ target }) => {
  if (target.classList.contains('js-station-delete-button')) {
    deleteStation(target);
    return;
  }

  if (target.classList.contains('js-station-edit-button')) {
    const { dataset } = target.closest('.js-station-list-item');

    updateStationNameEditModal(dataset);
    openModal($('#station-name-edit-modal'));
    $('#station-edit-name').focus();

    return;
  }
};

export default handleStationStatus;
