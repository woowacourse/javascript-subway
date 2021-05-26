import { $ } from './dom.js';

const SNACKBAR_DELAY = 3000;

export default function popSnackbar(message) {
  const snackbar = document.createElement('div');
  snackbar.classList.add('snackbar');

  $('#snackbar-container').append(snackbar);

  snackbar.innerText = message;
  snackbar.classList.add('show');

  setTimeout(() => {
    snackbar.remove();
  }, SNACKBAR_DELAY);
}
