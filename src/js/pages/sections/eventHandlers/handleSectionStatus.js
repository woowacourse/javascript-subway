import store from '../../../store';
import { $ } from '../../../utils/dom';
import { openModal } from '../../../utils/modal';
import { initDownStationSelect, initUpStationSelect } from '../viewController';

const handleSectionStatus = event => {
  const $targetSection = event.target.closest('.js-section-list-item');

  const lineId = Number($('.js-section-list').dataset.lineId);
  const upStationId = Number($targetSection.dataset.upStationId);
  const upStationName = $targetSection.dataset.upStationName;

  if (event.target.classList.contains('section-add-button')) {
    initUpStationSelect({ id: upStationId, name: upStationName });

    const stations = store.station.get();
    const lineStations = store.line.getLineStations(lineId);
    const availableDownStations = stations.filter(
      station => !lineStations.find(lineStation => lineStation.id === station.id)
    );

    initDownStationSelect(availableDownStations);
    openModal($('#section-add-modal'));
  }

  if (event.target.classList.contains('section-edit-button')) {
    openModal($('#section-edit-modal'));
  }

  if (event.target.classList.contains('section-delete-button')) {
  }
};

export default handleSectionStatus;
