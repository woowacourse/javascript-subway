import { $ } from './index.js';

const $snackbarContainer = $('#snackbar-container');

export const showSnackbar = (message) => {
  let timer;

  const snackbar = () => {
    $snackbarContainer.innerHTML = `<div class="snackbar">${message}</div>`;

    const $snackbar = $('.snackbar');

    $snackbar.classList.add('show');

    if (timer) {
      timer = clearTimeout(timer);
    }

    timer = setTimeout(() => {
      $snackbar.classList.remove('show');
    }, 3000);
  };

  return snackbar();
};
