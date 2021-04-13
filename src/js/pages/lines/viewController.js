import { LINE_FORM_LABEL } from '../../constants/service';
import { $, appendChildTemplate } from '../../utils/dom';
import { lineListItemTemplate, stationOptionListTemplate } from './template';

export const addLineListItem = ({ id, name, color, sections }) => {
  appendChildTemplate($('.js-line-list'), lineListItemTemplate({ id, name, color, sections }));
};

export const updateLineListItem = ({ id, name, color }) => {
  $(`[data-id="${id}"] .js-line-name`).textContent = name;

  const $lineColorDot = $(`[data-id="${id}"] .subway-line-color-dot`);
  $lineColorDot.classList.remove(...$lineColorDot.classList);
  $lineColorDot.classList.add('subway-line-color-dot', color);

  $(`[data-id="${id}"]`).dataset.name = name;
  $(`[data-id="${id}"]`).dataset.color = color;
};

export const updateLineColorDot = ($targetModal, color) => {
  const $lineColorDot = $targetModal.querySelector('.js-subway-line-color-dot');

  $targetModal.querySelector('#subway-line-color').value = color;
  $lineColorDot.classList.remove(...$lineColorDot.classList);
  $lineColorDot.classList.add('js-subway-line-color-dot', 'subway-line-color-dot', color);
};

export const initUpStationSelect = stations => {
  const template = stationOptionListTemplate(stations, LINE_FORM_LABEL.UP_STATION);
  $('#up-station').innerHTML = template;
};

export const initDownStationSelect = stations => {
  const template = stationOptionListTemplate(stations, LINE_FORM_LABEL.DOWN_STATION);
  $('#down-station').innerHTML = template;
};

export const updateLineEditModal = ({ id, name, color }) => {
  updateLineColorDot($('#line-edit-form'), color);
  $('#line-edit-form').dataset.lineId = id;
  $('#line-edit-form #subway-line-color').value = color;
  $('#line-edit-form #subway-line-name').value = name;
};
