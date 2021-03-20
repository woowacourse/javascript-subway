import { $ } from './dom';

const snackbarTemplate = (message) => `<div class="snackbar">${message}</div>`;

export const showSnackbar = (() => {
  let timeout;
  return ({ message, showtime }) => {
    $('.snackbar-wrapper').innerHTML = snackbarTemplate(message);

    const $snackbar = $('.snackbar');
    $snackbar.classList.add('show');

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      $snackbar.classList.remove('show');
    }, showtime);
  };
})();
