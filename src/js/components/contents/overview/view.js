import requestReadLine from '../lines/read.js';
import { OVERVIEW_ITEM_TEMPLATE, OVERVIEW_TEMPLATE } from './template.js';

const $wrapper = document.createElement('div');
$wrapper.classList.add('wrapper', 'bg-white', 'p-10');
$wrapper.innerHTML = OVERVIEW_TEMPLATE;

const $listOfLines = $wrapper.querySelector('.overview-line-list');

// eslint-disable-next-line import/prefer-default-export
export const renderOverview = async ($main) => {
  await renderLineList();
  $main.replaceChildren($wrapper);
};

async function renderLineList() {
  const lineList = await requestReadLine();

  $listOfLines.innerHTML = lineList.map((line) => OVERVIEW_ITEM_TEMPLATE(line)).join('');
}
