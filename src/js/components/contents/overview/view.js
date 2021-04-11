import { OVERVIEW_TEMPLATE } from './template.js';

const $wrapper = document.createElement('div');
$wrapper.classList.add('wrapper', 'bg-white', 'p-10');
$wrapper.innerHTML = OVERVIEW_TEMPLATE;

// eslint-disable-next-line import/prefer-default-export
export async function renderOverview($main) {
  $main.replaceChildren($wrapper);
}
