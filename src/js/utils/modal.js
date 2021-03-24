import { $ } from './dom';

export const openModal = $target => {
  $target.classList.add('open');
};

export const closeModal = $target => {
  $target.classList.remove('open');
};

export const modalCloseEventInit = () => {
  $('.modal').addEventListener('click', ({ target, currentTarget }) => {
    if (currentTarget === target) closeModal(target);
  });

  $('.modal-close').addEventListener('click', () => closeModal($('.modal')));
};
