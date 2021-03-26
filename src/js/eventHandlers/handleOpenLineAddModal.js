import store from '../store';
import { $ } from '../utils/dom';
import { colorOptions } from '../utils/mock';
import { openModal } from '../utils/modal';
import { initUpStationSelect, updateLineColorDot } from '../viewController/lines';

const handleOpenLineAddModal = () => {
  const $lineAddModal = $('#line-add-modal');

  openModal($lineAddModal);
  $lineAddModal.querySelector('#subway-line-name').focus();

  const randomNumber = Math.floor(Math.random() * colorOptions.length);
  updateLineColorDot($lineAddModal, `bg-${colorOptions[randomNumber]}`);

  initUpStationSelect(store.station.get());
};

export default handleOpenLineAddModal;
