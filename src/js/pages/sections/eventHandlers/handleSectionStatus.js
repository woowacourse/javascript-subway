import { getAvailableStations } from '../../../services/section';
import { $ } from '../../../utils/dom';
import { openModal } from '../../../utils/modal';
import { SECTION } from '../../../constants/alertMessage';
import { initDownStationSelect, initUpStationSelect, setMaxNumber } from '../viewController';

const handleSectionStatus = event => {
  const $targetSection = event.target.closest('.js-section-list-item');

  const lineId = Number($('.js-section-list').dataset.lineId);
  const upStationId = Number($targetSection.dataset.upStationId);
  const upStationName = $targetSection.dataset.upStationName;
  const distance = $targetSection.dataset.distance;
  const duration = $targetSection.dataset.duration;

  if (event.target.classList.contains('section-add-button')) {
    const availableStations = getAvailableStations(lineId);

    if (availableStations.length <= 0) {
      alert(SECTION.NO_AVAILABLE_STATION);
      return;
    }

    initUpStationSelect({ id: upStationId, name: upStationName });

    const availableDownStations = getAvailableStations(lineId);
    initDownStationSelect(availableDownStations);

    setMaxNumber({ distance: distance - 1, duration: duration - 1 });

    openModal($('#section-add-modal'));
  }

  if (event.target.classList.contains('section-edit-button')) {
    openModal($('#section-edit-modal'));
  }

  if (event.target.classList.contains('section-delete-button')) {
  }
};

export default handleSectionStatus;
