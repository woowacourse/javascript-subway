import { optionTemplate } from '../../templates/option';
import { $ } from '../../utils/dom';

export const initUpStationSelect = ({ id, name }) => {
  $('#up-station').innerHTML = optionTemplate(id, name);
};

export const initDownStationSelect = stations => {
  $('#down-station').innerHTML = stations.map(({ id, name }) => optionTemplate(id, name));
};
