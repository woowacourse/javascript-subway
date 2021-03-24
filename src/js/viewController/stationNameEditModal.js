import { $ } from '../utils/dom';

export const updateStationNameEditModal = ({ id, name }) => {
  $('#station-name-edit-form').dataset.stationId = id;
  $('#station-name-edit-form').dataset.oldStationName = name;
  $('#station-edit-name').value = name;
};
