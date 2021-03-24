import { requestAddLine } from '../services/line';
import { LINE } from '../constants/alertMessage';
import { STATION_AMOUNT } from '../constants/service';
import station from '../store/station';
import { closeModal } from '../utils/modal';
import { $ } from '../utils/dom';
import { addLine } from '../viewController/lineList';

const handleAddLine = async event => {
  event.preventDefault();

  if (station.length < STATION_AMOUNT.MIN) {
    alert(LINE.TOO_FEW_STATION);
    return;
  }

  const {
    ['subway-line-name']: name,
    ['departure-station']: upStationId,
    ['arrival-station']: downStationId,
    ['subway-line-color']: color,
    duration,
    distance,
  } = event.target.elements;

  const result = await requestAddLine({
    name: name.value,
    upStationId: Number(upStationId.value),
    downStationId: Number(downStationId.value),
    distance: distance.valueAsNumber,
    color: color.value,
    duration: duration.valueAsNumber,
  });

  if (!result.success) {
    // 에러메시지
    return;
  }

  addLine(result.data);
  closeModal($('#line-add-modal'));
};

export default handleAddLine;
