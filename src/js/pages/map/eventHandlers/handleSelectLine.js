import { getSections } from '../../../services/section';
import store from '../../../store';
import { $ } from '../../../utils/dom';
import { setSelectElementColor } from '../../../utils/style';
import { highlightStation, setMapLineColor, updateMapList, updateTransferLine } from '../viewController';

const handleSelectLine = event => {
  const $lineSelect = event.currentTarget;

  const id = Number(event.target.value);
  const color = store.line.getColor(id);
  const sections = getSections(id, { isContainsStartSection: false });

  setSelectElementColor($lineSelect, color);
  updateMapList(sections);
  updateTransferLine(sections, id);
  setMapLineColor(color);

  $('.js-map-list').dataset.lineId = id;

  if (event?.detail?.stationId) {
    highlightStation(Number(event.detail.stationId));
  }
};

export default handleSelectLine;
