import { lineListItemTemplate, stationOptionListTemplate } from '../templates/lines';
import { $, appendChildTemplate } from '../utils/dom';
import { LINE_FORM_LABEL } from '../constants/service';

export const addLineListItem = ({ id, name, color }) => {
  appendChildTemplate($('.js-line-list'), lineListItemTemplate({ id, name, color }));
};

export const updateLineColorDot = ($targetModal, color) => {
  const $lineColorDot = $targetModal.querySelector('.js-subway-line-color-dot');

  $targetModal.querySelector('#subway-line-color').value = color;
  $lineColorDot.classList.remove(...$lineColorDot.classList);
  $lineColorDot.classList.add('js-subway-line-color-dot', 'subway-line-color-dot', color);
};

export const initDepartureStationSelect = stations => {
  const template = stationOptionListTemplate(stations, LINE_FORM_LABEL.DEPARTURE_STATION);
  $('#departure-station').innerHTML = template;
};

export const initArrivalStationSelect = stations => {
  const template = stationOptionListTemplate(stations, LINE_FORM_LABEL.ARRIVAL_STATION);
  $('#arrival-station').innerHTML = template;
};

export const updateLineEditModal = ({ color }) => {
  updateLineColorDot($('#line-edit-modal'), color);
  $('#line-edit-modal #subway-line-color').value = color;
};
