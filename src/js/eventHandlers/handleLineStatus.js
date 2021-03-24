import { requestDeleteLine } from '../services/line';
import { LINE } from '../constants/alertMessage';
import line from '../store/line';

const deleteLine = async target => {
  if (!window.confirm(LINE.DELETE_LINE_CONFIRM)) return;

  const $targetLine = target.closest('.line-list-item');
  const lineID = $targetLine.dataset.id;

  const result = await requestDeleteLine(lineID);
  if (!result.success) {
    alert(result.message);
    return;
  }
  line.delete(lineID);
  $targetLine.remove();

  alert(LINE.DELETE_LINE_SUCCESS);
};

export const handleLineStatus = async ({ target }) => {
  if (target.classList.contains('js-line-delete-button')) {
    deleteLine(target);
    return;
  }

  // if (target.classList.contains('js-station-edit-button')) {
  //   const { dataset } = target.closest('.station-list-item');

  //   updateStationNameEditModal(dataset);
  //   openModal($('#station-name-edit-modal'));
  //   $('#station-edit-name').focus();

  //   return;
  // }
};

export default handleLineStatus;
