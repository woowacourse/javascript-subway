import { $ } from './dom.js';

export const showModal = () => {
  const $modal = $('.modal');
  $modal.classList.add('open');
};

export const closeModal = () => {
  const $modal = $('.modal');
  $modal.classList.remove('open');
};

export const bindModalCloseEvent = () => {
  const $modalClose = $('.modal-close');
  $modalClose.addEventListener('click', closeModal);
};
