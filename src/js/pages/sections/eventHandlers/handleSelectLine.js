import store from '../../../store';
import { $ } from '../../../utils/dom';
import { getTextColorByBackgroundColor } from '../../../utils/style';
import { updateSectionList } from '../viewController';

const handleSelectLine = event => {
  const $lineSelect = event.currentTarget;

  const id = Number(event.target.value);
  const color = store.line.getColor(id);

  $lineSelect.classList.remove(...$lineSelect.classList);
  $lineSelect.classList.add(color);

  const rgb = window.getComputedStyle($lineSelect, null).backgroundColor;
  $lineSelect.style.color = getTextColorByBackgroundColor(rgb);

  const stations = store.line.getLineStations(id);
  const sections = store.line.getLineSections(id);
  const data = [...sections, { upStation: stations[stations.length - 1] }];

  const $sectionList = $('.js-section-list');
  updateSectionList(data);
  $sectionList.dataset.lineId = id;
};

export default handleSelectLine;
