/* eslint-disable no-unused-vars */
import getSubwayData from './getSubwayData.js';
import { onClickButtonOfList, onClickButtonOfForm } from './onClickButton.js';
import { requestCreateSection, updateSubmitButtonState } from './create.js';
import { dispatchFormData } from '../../../utils/index.js';
import {
  STATION_OPTION_TEMPLATE,
  LINE_OPTION_TEMPLATE,
  SECTION_OF_LINE_TEMPLATE,
  SECTIONS_TEMPLATE,
} from './template.js';

const $wrapper = document.createElement('div');
$wrapper.classList.add('wrapper', 'bg-white', 'p-10');
$wrapper.innerHTML = SECTIONS_TEMPLATE;

const $list = $wrapper.querySelector('ul');
const $lineSelect = $wrapper.querySelector('#line-select');
const $addForm = $wrapper.querySelector('#add-form');
const $stationSelect = $addForm.querySelector('#station-select');

$lineSelect.addEventListener('change', onChangeLine);

$list.addEventListener('click', onClickButtonOfList);
$addForm.addEventListener('click', onClickButtonOfForm);
$addForm.addEventListener('input', updateSubmitButtonState);
$addForm.addEventListener('submit', dispatchFormData);
$addForm.addEventListener('formdata', requestCreateSection);

let selectedLineId;

export async function renderSections($main) {
  const { totalLineList, sectionListOfLine, stationOptionList, lineId } = await getSubwayData(selectedLineId);

  selectedLineId = lineId;
  renderLineSelect(totalLineList);
  renderSectionListOfLine(sectionListOfLine, lineId);
  renderAddForm(stationOptionList, lineId);

  $main.replaceChildren($wrapper);
}

async function onChangeLine({ target }) {
  selectedLineId = Number(target.value);
  const { sectionListOfLine, stationOptionList } = await getSubwayData(selectedLineId);

  renderSectionListOfLine(sectionListOfLine, selectedLineId);
  renderAddForm(stationOptionList, selectedLineId);
}

function renderLineSelect(totalLineList) {
  $lineSelect.innerHTML = LINE_OPTION_TEMPLATE(totalLineList);
}

function renderSectionListOfLine(sectionListOfLine, lineId) {
  $list.innerHTML = sectionListOfLine.map((station) => SECTION_OF_LINE_TEMPLATE(station, lineId)).join('');
}

function renderAddForm(stationOptionList, lineId) {
  $stationSelect.innerHTML = STATION_OPTION_TEMPLATE(stationOptionList);
  $addForm.dataset.lineId = lineId;
}

export function renderEditMode(stationId, offsetTop) {
  $addForm.classList.remove('v-hidden');
  $addForm.style.top = offsetTop;
  $addForm.dataset.upStationId = stationId;

  $stationSelect.focus();
}

export function renderNonEditMode() {
  $addForm.classList.add('v-hidden');
  $addForm.reset();
}
