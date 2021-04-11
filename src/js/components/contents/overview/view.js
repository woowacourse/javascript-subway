import requestReadLine from '../lines/read.js';
import { getSectionList } from '../sections/getSubwayData.js';
import { OVERVIEW_TEMPLATE, SECTION_LIST_ITEM_TEMPLATE } from './template.js';

const $wrapper = document.createElement('div');
$wrapper.classList.add('wrapper', 'bg-white', 'p-10');
$wrapper.innerHTML = OVERVIEW_TEMPLATE;

const $sectionList = $wrapper.querySelector('.section-list');

// eslint-disable-next-line import/prefer-default-export
export async function renderOverview($main) {
  const totalLineList = await requestReadLine();
  const totalSectionList = totalLineList.map(({ id, name, color }) => [name, color, getSectionList(totalLineList, id)]);

  $sectionList.innerHTML = totalSectionList
    .map(([lineName, color, sectionList]) => SECTION_LIST_ITEM_TEMPLATE(lineName, color, sectionList))
    .join('');

  $main.replaceChildren($wrapper);
}
