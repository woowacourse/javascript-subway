import { ID_SELECTOR } from '../constants';
import $ from './querySelector';

const show = selector => {
  $(selector).classList.remove('hidden');
};

const hide = selector => {
  $(selector).classList.add('hidden');
};

const openModal = () => {
  $(`#${ID_SELECTOR.MODAL}`).classList.add('open');
};

const closeModal = () => {
  $(`#${ID_SELECTOR.MODAL}`).classList.remove('open');
};

export { show, hide, openModal, closeModal };
