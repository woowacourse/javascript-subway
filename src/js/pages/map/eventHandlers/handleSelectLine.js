import store from '../../../store';
import { $ } from '../../../utils/dom';
import { setSelectElementColor } from '../../../utils/style';

const handleSelectLine = event => {
  const $lineSelect = event.currentTarget;

  const id = Number(event.target.value);
  const color = store.line.getColor(id);

  setSelectElementColor($lineSelect, color);

  const $mapList = $('.js-map-list');
  $mapList.dataset.lineId = id;
};

export default handleSelectLine;
