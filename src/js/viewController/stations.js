import { stationListItemTemplate } from '../templates/stations';
import { $, appendChildTemplate } from '../utils/dom';

export const updateStationListItem = ({ id, name }) => {
  $(`[data-id="${id}"] .js-station-name`).textContent = name;
  $(`[data-id="${id}"]`).dataset.name = name;
};

export const addStationListItem = ({ id, name }) => {
  appendChildTemplate($('#station-list'), stationListItemTemplate({ id, name }));
};

export const updateStationNameEditModal = ({ id, name }) => {
  $('#station-name-edit-form').dataset.stationId = id;
  $('#station-name-edit-form').dataset.oldStationName = name;
  $('#station-edit-name').value = name;
};
