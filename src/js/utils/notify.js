import { $ } from './DOM.js';

const $snackbarContainer = $('#snackbar-container');

const showSnackbar = (message = '') => {
  const $snackbar = document.createElement('div');
  $snackbar.classList.add('snackbar');
  $snackbar.innerText = message;
  $snackbar.addEventListener('animationend', ({ target }) => target.remove());

  $snackbarContainer.append($snackbar);
};

const showNotification = (message) => {
  showSnackbar(message);
};

export { showSnackbar, showNotification };
