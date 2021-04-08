import onClickButton from './onClickButton.js';
import requestReadLine from './read.js';
import requestReadStation from '../stations/read.js';
import requestUpdateLine from './update.js';
import { requestCreateLine, updateSubmitButtonState, onChangeAddLineColor } from './create.js';
import { dispatchFormData } from '../../../utils/index.js';
import { LIST_ITEM_TEMPLATE, LINES_TEMPLATE, OPTION_TEMPLATE } from './template.js';

const DEFAULT_COLOR_CODE = '#000000';
const [UP_STATION, DOWN_STATION] = ['상행역', '하행역'];
const $wrapper = document.createElement('div');
$wrapper.classList.add('wrapper', 'bg-white', 'p-10');
$wrapper.innerHTML = LINES_TEMPLATE;

const $list = $wrapper.querySelector('ul');
const $addForm = $wrapper.querySelector('.add-form');
const $addInput = $addForm.elements['add-line-name'];
const $addLineColorInput = $addForm.color;
const $addLineColorText = $addForm.querySelector('#add-line-color-label');
const $addUpStationSelect = $addForm.elements['add-up-station'];
const $addDownStationSelect = $addForm.elements['add-down-station'];

$addForm.addEventListener('input', updateSubmitButtonState);
$addForm.addEventListener('submit', dispatchFormData);
$addForm.addEventListener('formdata', requestCreateLine);
$addLineColorInput.addEventListener('change', onChangeAddLineColor);

$list.addEventListener('click', onClickButton);
$list.addEventListener('submit', dispatchFormData);
$list.addEventListener('formdata', requestUpdateLine);

export async function renderLines($main) {
  await renderOptions();
  await renderLineList();
  renderDefaultAddColor();
  $main.replaceChildren($wrapper);
  $addInput.focus();
}

async function renderOptions() {
  const stationList = await requestReadStation();

  $addUpStationSelect.innerHTML = OPTION_TEMPLATE(stationList, UP_STATION);
  $addDownStationSelect.innerHTML = OPTION_TEMPLATE(stationList, DOWN_STATION);
}

async function renderLineList() {
  const lineList = await requestReadLine();

  $list.innerHTML = lineList
    .map((line) => LIST_ITEM_TEMPLATE(line))
    .reverse()
    .join('');
}

export function renderEditMode($editForm) {
  const $nameInput = $editForm.name;
  const $colorInput = $editForm.color;

  $nameInput.disabled = false;
  $nameInput.focus();
  $colorInput.disabled = false;
  $editForm.classList.add('edit-mode');
}

export function renderNonEditMode($editForm) {
  const $nameInput = $editForm.name;
  const $colorInput = $editForm.color;

  $nameInput.value = $nameInput.defaultValue;
  $nameInput.disabled = true;
  $colorInput.value = $colorInput.defaultValue;
  $colorInput.disabled = true;
  $editForm.classList.remove('edit-mode');
}

function renderDefaultAddColor() {
  $addLineColorInput.value = DEFAULT_COLOR_CODE;
  $addLineColorText.innerText = DEFAULT_COLOR_CODE;
}

export function renderColorText(colorCode) {
  $addLineColorText.innerText = colorCode;
}
