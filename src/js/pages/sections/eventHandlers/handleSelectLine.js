import { getSections } from '../../../services/section';
import store from '../../../store';
import { $ } from '../../../utils/dom';
import { setSelectElementColor } from '../../../utils/style';
import { updateSectionList } from '../viewController';

const handleSelectLine = event => {
  const $lineSelect = event.currentTarget;

  const id = Number(event.target.value);
  const color = store.line.getColor(id);

  setSelectElementColor($lineSelect, color);

  updateSectionList(getSections(id));
  $('.js-section-list').dataset.lineId = id;
};

export default handleSelectLine;
