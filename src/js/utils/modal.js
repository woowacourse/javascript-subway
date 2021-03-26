import { $ } from './dom';

export const openModal = $target => {
  $target.classList.add('open');
};

export const closeModal = $target => {
  $target.classList.remove('open');
};

export const modalCloseEventInit = selector => {
  $(`${selector}`).addEventListener('click', ({ target, currentTarget }) => {
    if (currentTarget === target) closeModal(target);
  });

  $(`${selector} .modal-close`).addEventListener('click', () => closeModal($('.modal.open')));
};
