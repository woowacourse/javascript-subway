import { requestAddSection } from '../../../api/section';
import { SECTION, STORE } from '../../../constants/alertMessage';
import { getSections } from '../../../services/section';
import store from '../../../store';
import { $ } from '../../../utils/dom';
import { closeModal } from '../../../utils/modal';
import snackbar from '../../../utils/snackbar';
import { updateSectionList } from '../viewController';

const handleAddSection = async event => {
  event.preventDefault();

  const lineId = Number($('.js-section-list').dataset.lineId);
  const upStationId = Number(event.target['up-station-id'].value);
  const downStationId = Number(event.target['down-station-id'].value);
  const distance = event.target.distance.valueAsNumber;
  const duration = event.target.duration.valueAsNumber;

  const result = await requestAddSection({ lineId, upStationId, downStationId, distance, duration });

  if (!result.success) {
    snackbar.open(result.message);
    return;
  }

  try {
    await store.line.init();
  } catch (error) {
    snackbar.open(STORE.DATA_LOAD_FAILED);
    return;
  }

  updateSectionList(getSections(lineId));
  closeModal($('#section-add-modal'));
  $('#section-add-form').reset();

  snackbar.open(SECTION.ADD_SECTION_SUCCESS);
};

export default handleAddSection;
