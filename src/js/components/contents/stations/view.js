import onClickButton from './onClickButton.js';
import { requestCreateStation, updateSubmitButtonState } from './create.js';
import requestReadStation from './read.js';
import requestUpdateStation from './update.js';
import { dispatchFormData } from '../../../utils/index.js';
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

export async function renderStations($main) {
  const stationList = await requestReadStation();

  $list.innerHTML = stationList
    .map((station) => LIST_ITEM_TEMPLATE(station))
    .reverse()
    .join('');

  $main.replaceChildren($wrapper);
  $addInput.focus();
}

export function renderEditMode($editForm) {
  $editForm.classList.add('edit-mode');

  const $editInput = $editForm.querySelector('input');
  $editInput.disabled = false;
  // FIXME: 최초 focus시 커서가 제일 앞임
  $editInput.focus();
}

export function renderNonEditMode($editForm) {
  $editForm.classList.remove('edit-mode');

  const $editInput = $editForm.querySelector('input');
  $editInput.disabled = true;
}
