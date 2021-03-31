import onClickButton from './onClickButton.js';
import requestReadStation from './read.js';
import requestCreateStation from './create.js';
import requestUpdateStation from './update.js';
import updateSubmitButtonState from './validate.js';
import { dispatchFormData, show, hide } from '../../../utils/index.js';
import { LIST_ITEM_TEMPLATE, STATIONS_TEMPLATE } from './template.js';

const $wrapper = document.createElement('div');
$wrapper.classList.add('wrapper', 'bg-white', 'p-10');
$wrapper.innerHTML = STATIONS_TEMPLATE;

const $list = $wrapper.querySelector('ul');
const $addForm = $wrapper.querySelector('.add-form');
const $addInput = $addForm.elements['add-station-name'];

$addForm.addEventListener('input', updateSubmitButtonState);
$addForm.addEventListener('submit', dispatchFormData);
$addForm.addEventListener('formdata', requestCreateStation);

$list.addEventListener('click', onClickButton);
$list.addEventListener('submit', dispatchFormData);
$list.addEventListener('formdata', requestUpdateStation);

export const renderStations = async ($main) => {
  const stationList = await requestReadStation();

  $list.innerHTML = stationList
    .map((station) => LIST_ITEM_TEMPLATE(station))
    .reverse()
    .join('');

  $main.replaceChildren($wrapper);
  $addInput.focus();
};

export function renderEditMode($editForm) {
  const $editInput = $editForm.querySelector('input');
  const $editButton = $editForm.querySelector('.edit-button');
  const $checkButton = $editForm.querySelector('.check-button');
  const $undoButton = $editForm.querySelector('.undo-button');
  const $removeButton = $editForm.querySelector('.remove-button');

  $editInput.disabled = false;
  // TODO: 수정 가능한 input 스타일로 변경

  hide($editButton);
  show($undoButton);
  show($checkButton);
  show($removeButton);
}

export function renderNonEditMode($editForm) {
  const $editInput = $editForm.querySelector('input');
  const $editButton = $editForm.querySelector('.edit-button');
  const $checkButton = $editForm.querySelector('.check-button');
  const $undoButton = $editForm.querySelector('.undo-button');
  const $removeButton = $editForm.querySelector('.remove-button');

  $editInput.disabled = true;
  // TODO: 수정 불가능한 input 스타일로 변경

  show($editButton);
  hide($undoButton);
  hide($checkButton);
  hide($removeButton);
}
