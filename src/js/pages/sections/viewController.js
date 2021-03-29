import { optionTemplate } from '../../templates/option';
import { $ } from '../../utils/dom';
import { sectionListItems } from './template';

export const initUpStationSelect = ({ id, name }) => {
  $('#up-station').innerHTML = optionTemplate(id, name);
};

export const initDownStationSelect = stations => {
  $('#down-station').innerHTML = stations.map(({ id, name }) => optionTemplate(id, name));
};

export const updateSectionList = sections => {
  $('.js-section-list').innerHTML = sectionListItems(sections);
};

export const setMaxNumber = ({ distance, duration }) => {
  $('#section-add-form #distance').setAttribute('max', distance);
  $('#section-add-form #duration').setAttribute('max', duration);
};
