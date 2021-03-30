import { getAvailableStations } from '../../services/section';
import { optionTemplate } from '../../templates/option';
import { $ } from '../../utils/dom';
import { sectionListItems } from './template';

const initUpStationSelect = stations => {
  $('#up-station').innerHTML = stations.map(({ id, name }) => optionTemplate(id, name));
};

const initDownStationSelect = stations => {
  $('#down-station').innerHTML = stations.map(({ id, name }) => optionTemplate(id, name));
};

const setMaxNumber = ({ distance, duration }) => {
  if (distance > 0 && duration > 0) {
    $('#section-add-form #distance').setAttribute('max', distance);
    $('#section-add-form #duration').setAttribute('max', duration);
  } else {
    $('#section-add-form #distance').removeAttribute('max');
    $('#section-add-form #duration').removeAttribute('max');
  }
};

export const updateSectionList = sections => {
  $('.js-section-list').innerHTML = sectionListItems(sections);
};

export const updateUpStationAddModal = ({ lineId, downStationId, downStationName, distance, duration }) => {
  const availableStations = getAvailableStations(lineId);

  initUpStationSelect(availableStations);
  initDownStationSelect([{ id: downStationId, name: downStationName }]);

  setMaxNumber({ distance: distance - 1, duration: duration - 1 });
};

export const updateDownStationAddModal = ({ lineId, upStationId, upStationName, distance, duration }) => {
  const availableStations = getAvailableStations(lineId);

  initUpStationSelect([{ id: upStationId, name: upStationName }]);
  initDownStationSelect(availableStations);

  setMaxNumber({ distance: distance - 1, duration: duration - 1 });
};
