import { $ } from '../../utils/dom';
import { mapListItems } from './template';

export const updateMapList = sections => {
  $('.js-map-list').innerHTML = mapListItems(sections);
};

export const toggleTransferCircle = $target => {
  $target.classList.toggle('transfer-available');
};

export const setMapLineColor = color => {
  $('.js-map-list').style.setProperty('--line-color', `var(--${color})`);
};
