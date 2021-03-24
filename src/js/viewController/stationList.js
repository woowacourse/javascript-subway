import { $ } from '../utils/dom';

export const updateStationListItem = ({ id, name }) => {
  $(`[data-id="${id}"] .js-station-name`).textContent = name;
  $(`[data-id="${id}"]`).dataset.name = name;
};
