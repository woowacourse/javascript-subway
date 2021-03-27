import { $ } from './dom.js';

export const onModalShow = () => {
  const $modal = $('.modal');
  $modal.classList.add('open');
};

export const onModalClose = () => {
  const $modal = $('.modal');
  $modal.classList.remove('open');
};

export const initModal = () => {
  const $modalClose = $('.modal-close');
  $modalClose.addEventListener('click', onModalClose);
};
