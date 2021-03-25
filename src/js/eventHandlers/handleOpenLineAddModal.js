import store from '../store';
import { $ } from '../utils/dom';
import { colorOptions } from '../utils/mock';
import { openModal } from '../utils/modal';
import { initDepartureStationSelect, updateLineColorDot } from '../viewController/lineAddModal';

const handleOpenLineAddModal = () => {
  openModal($('#line-add-modal'));
  $('#subway-line-name').focus();

  const randomNumber = Math.floor(Math.random() * colorOptions.length);
  updateLineColorDot(`bg-${colorOptions[randomNumber]}`);

  initDepartureStationSelect(store.station.get());
};

export default handleOpenLineAddModal;
