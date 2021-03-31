import onClickButton from './onClickButton.js';
import requestReadLine from './read.js';
import requestReadStation from '../stations/read.js';
import requestUpdateLine from './update.js';
import { requestCreateLine, updateSubmitButtonState } from './create.js';
import { dispatchFormData, hide, show } from '../../../utils/index.js';
import { LIST_ITEM_TEMPLATE, LINES_TEMPLATE, OPTION_TEMPLATE } from './template.js';

const [UP_STATION, DOWN_STATION] = ['상행역', '하행역'];
const $wrapper = document.createElement('div');
$wrapper.classList.add('wrapper', 'bg-white', 'p-10');
$wrapper.innerHTML = LINES_TEMPLATE;

const $list = $wrapper.querySelector('ul');
const $addForm = $wrapper.querySelector('.add-form');
const $addInput = $addForm.elements['add-line-name'];

const $addUpStationSelect = $addForm.elements['add-up-station'];
const $addDownStationSelect = $addForm.elements['add-down-station'];

$addForm.addEventListener('input', updateSubmitButtonState);
$addForm.addEventListener('submit', dispatchFormData);
$addForm.addEventListener('formdata', requestCreateLine);

$list.addEventListener('click', onClickButton);
$list.addEventListener('submit', dispatchFormData);
$list.addEventListener('formdata', requestUpdateLine);

export async function renderLines($main) {
  await renderOptions();
  await renderLineList();
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
  const $nameInput = $editForm.querySelector('input[type="text"]');
  const $colorInput = $editForm.querySelector('input[type="color"]');
  const $editButton = $editForm.querySelector('.edit-button');
  const $checkButton = $editForm.querySelector('.check-button');
  const $undoButton = $editForm.querySelector('.undo-button');
  const $removeButton = $editForm.querySelector('.remove-button');

  $nameInput.disabled = false;
  $colorInput.disabled = false;
  // TODO: 수정 가능한 input 스타일로 변경

  hide($editButton);
  show($undoButton);
  show($checkButton);
  show($removeButton);
}

export function renderNonEditMode($editForm) {
  const $nameInput = $editForm.querySelector('input[type="text"]');
  const $colorInput = $editForm.querySelector('input[type="color"]');
  const $editButton = $editForm.querySelector('.edit-button');
  const $checkButton = $editForm.querySelector('.check-button');
  const $undoButton = $editForm.querySelector('.undo-button');
  const $removeButton = $editForm.querySelector('.remove-button');

  $nameInput.disabled = true;
  $colorInput.disabled = true;
  // TODO: 수정 불가능한 input 스타일로 변경

  show($editButton);
  hide($undoButton);
  hide($checkButton);
  hide($removeButton);
}
