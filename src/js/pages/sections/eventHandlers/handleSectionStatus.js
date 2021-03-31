import { getAvailableStations, getSections } from '../../../services/section';
import { $ } from '../../../utils/dom';
import { openModal } from '../../../utils/modal';
import { SECTION, STORE } from '../../../constants/alertMessage';
import { initDownStationSelect, initUpStationSelect, setMaxNumber, updateSectionList } from '../viewController';
import { requestDeleteSection } from '../../../api/section';
import store from '../../../store';

const deleteSection = async ({ lineId, stationId }) => {
  if (!window.confirm(SECTION.DELETE_SECTION_CONFIRM)) return;

  const result = await requestDeleteSection({ lineId, stationId });

  if (!result.success) {
    alert(result.message);
    return;
  }
};

const handleSectionStatus = async event => {
  const $targetSection = event.target.closest('.js-section-list-item');

  const lineId = Number($('.js-section-list').dataset.lineId);
  const upStationId = Number($targetSection.dataset.upStationId);
  const upStationName = $targetSection.dataset.upStationName;
  const distance = Number($targetSection.dataset.distance);
  const duration = Number($targetSection.dataset.duration);

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
    await deleteSection({ lineId, stationId: upStationId });

    try {
      await store.line.init();
    } catch (error) {
      alert(STORE.DATA_LOAD_FAILED);
      return;
    }
    updateSectionList(getSections(lineId));
  }
};

export default handleSectionStatus;
