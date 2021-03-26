import { requestEditLine } from '../services/line';
import { LINE } from '../constants/alertMessage';
import { STATION_AMOUNT } from '../constants/service';
import store from '../store';
import { closeModal } from '../utils/modal';
import { $ } from '../utils/dom';
import { updateLineListItem } from '../viewController/lines';

const handleEditLine = async event => {
  event.preventDefault();

  if (store.station.length < STATION_AMOUNT.MIN) {
    alert(LINE.TOO_FEW_STATION);
    return;
  }

  const id = event.target.dataset.lineId;
  const { ['subway-line-name']: name, ['subway-line-color']: color } = event.target.elements;

  const result = await requestEditLine(id, {
    name: name.value,
    color: color.value,
  });

  if (!result.success) {
    alert(result.message);
    return;
  }

  store.line.edit(result.data);
  updateLineListItem({ id, name: name.value, color: color.value });
  closeModal($('#line-edit-modal'));
  event.target.reset();
};

export default handleEditLine;
