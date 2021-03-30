import { LIST_ITEM_TEMPLATE, STATIONS_TEMPLATE } from './template.js';
import { requestReadStation, requestCreateStation } from './request.js';
import updateSubmitButtonState from './validate.js';
import { dispatchFormData } from '../../../utils/index.js';

const $main = document.createElement('main');
$main.classList.add('mt-10', 'd-flex', 'justify-center');
$main.innerHTML = STATIONS_TEMPLATE;

const $list = $main.querySelector('ul');
const $form = $main.querySelector('form');
const $input = $form.elements['add-station-name'];

$form.addEventListener('input', updateSubmitButtonState);
$form.addEventListener('submit', dispatchFormData);
$form.addEventListener('formdata', requestCreateStation);

// eslint-disable-next-line import/prefer-default-export
export const renderStations = async ($parent) => {
  const stationList = await requestReadStation();

  $list.innerHTML = stationList
    .map((station) => LIST_ITEM_TEMPLATE(station))
    .reverse()
    .join('');
  $parent.replaceWith($main);

  $input.focus();
};
