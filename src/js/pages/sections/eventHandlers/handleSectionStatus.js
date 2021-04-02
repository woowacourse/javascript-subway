import { getAvailableStations, getSections } from '../../../services/section';
import { $ } from '../../../utils/dom';
import { openModal } from '../../../utils/modal';
import { SECTION, STORE } from '../../../constants/alertMessage';
import { updateDownStationAddModal, updateSectionList, updateUpStationAddModal } from '../viewController';
import { requestDeleteSection } from '../../../api/section';
import store from '../../../store';
import snackbar from '../../../utils/snackbar';

const deleteSection = async ({ lineId, stationId }) => {
  if (!window.confirm(SECTION.DELETE_SECTION_CONFIRM)) return;

  const result = await requestDeleteSection({ lineId, stationId });
  try {
    await store.line.init();
    updateSectionList(getSections(lineId));
  } catch (error) {
    snackbar.open(STORE.DATA_LOAD_FAILED);
    return;
  }

  if (!result.success) {
    snackbar.open(result.message);
    return;
  }

  snackbar.open(SECTION.DELETE_SECTION_SUCCESS);
};

const handleSectionStatus = async event => {
  if (!event.target.classList.contains('js-section-status-button')) return;

  const $targetSection = event.target.closest('.js-section-list-item');

  const lineId = Number($('.js-section-list').dataset.lineId);
  const upStationId = Number($targetSection.dataset.upStationId);
  const upStationName = $targetSection.dataset.upStationName;
  const downStationId = Number($targetSection.dataset.downStationId);
  const downStationName = $targetSection.dataset.downStationName;
  const distance = Number($targetSection.dataset.distance);
  const duration = Number($targetSection.dataset.duration);

  if (event.target.classList.contains('section-add-button')) {
    const availableStations = getAvailableStations(lineId);

    if (availableStations.length <= 0) {
      snackbar.open(SECTION.NO_AVAILABLE_STATION);
      return;
    }

    if (!upStationId) {
      updateUpStationAddModal({ lineId, downStationId, downStationName, distance, duration });
    } else {
      updateDownStationAddModal({ lineId, upStationId, upStationName, distance, duration });
    }

    openModal($('#section-add-modal'));
  }

  if (event.target.classList.contains('section-delete-button')) {
    deleteSection({ lineId, stationId: upStationId });

    try {
      await store.line.init();
    } catch (error) {
      snackbar.open(STORE.DATA_LOAD_FAILED);
      return;
    }
    updateSectionList(getSections(lineId));
  }
};

export default handleSectionStatus;
