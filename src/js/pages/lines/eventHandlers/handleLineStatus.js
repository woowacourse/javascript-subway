import store from '../../../store';
import { updateLineEditModal } from '../viewController';
import { $ } from '../../../utils/dom';
import { openModal } from '../../../utils/modal';
import { LINE } from '../../../constants/alertMessage';
import { requestDeleteLine } from '../../../services/line';

const deleteLine = async target => {
  if (!window.confirm(LINE.DELETE_LINE_CONFIRM)) return;

  const $targetLine = target.closest('.line-list-item');
  const lineID = $targetLine.dataset.id;

  const result = await requestDeleteLine(lineID);
  if (!result.success) {
    alert(result.message);
    return;
  }
  store.line.delete(lineID);
  $targetLine.remove();

  alert(LINE.DELETE_LINE_SUCCESS);
};

export const handleLineStatus = async ({ target }) => {
  if (target.classList.contains('js-line-delete-button')) {
    deleteLine(target);
    return;
  }

  if (target.classList.contains('js-line-edit-button')) {
    const { id, name, color } = target.closest('.line-list-item').dataset;

    updateLineEditModal({ id, name, color });
    openModal($('#line-edit-modal'));
    // $('#line-edit-modal #-edit-name').focus();

    return;
  }
};

export default handleLineStatus;
