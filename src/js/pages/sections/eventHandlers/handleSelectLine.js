import store from '../../../store';
import { $ } from '../../../utils/dom';
import { getTextColorByBackgroundColor } from '../../../utils/style';
import { sectionListItems } from '../template';

const handleSelectLine = event => {
  const $lineSelect = event.currentTarget;

  const id = Number(event.target.value);
  const color = store.line.getColor(id);

  $lineSelect.classList.remove(...$lineSelect.classList);
  $lineSelect.classList.add(color);

  const rgb = window.getComputedStyle($lineSelect, null).backgroundColor;
  $lineSelect.style.color = getTextColorByBackgroundColor(rgb);

  $('.js-section-list').innerHTML = sectionListItems(store.line.getLineStations(id));
};

export default handleSelectLine;
