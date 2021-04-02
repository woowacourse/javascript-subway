import { getSections } from '../../../services/section';
import store from '../../../store';
import { $ } from '../../../utils/dom';
import { setSelectElementColor } from '../../../utils/style';
import { setMapLineColor, updateMapList } from '../viewController';

const handleSelectLine = event => {
  const $lineSelect = event.currentTarget;

  const id = Number(event.target.value);
  const color = store.line.getColor(id);

  setSelectElementColor($lineSelect, color);

  updateMapList(getSections(id, { isContainsStartSection: false }));
  setMapLineColor(color);
  $('.js-map-list').dataset.lineId = id;
};

export default handleSelectLine;
