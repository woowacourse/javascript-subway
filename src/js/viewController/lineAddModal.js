import { $ } from '../utils/dom';
import { stationOptionListTemplate } from '../templates/lines';
import { LINE_FORM_LABEL } from '../constants/service';

export const updateLineColorDot = color => {
  const $lineColorDot = $('.js-subway-line-color-dot');
  $('#subway-line-color').value = color;
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
