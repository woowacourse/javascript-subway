import { $ } from './DOM';

const container = $('#snackbar-container');

const snackbar = (message) => {
  return `
    <div id="snackbar" >
      ${message}
    </div>
  `;
};

const duration = 3000;

export const showSnackbar = (message) => {
  let id;

  return (() => {
    container.innerHTML = snackbar(message);

    const $snackbar = $('#snackbar');

    $snackbar.classList.toggle('show');

    if (id) {
      clearTimeout(id);
    }

    id = setTimeout(() => {
      $snackbar.classList.toggle('show');
    }, duration);
  })();
};
