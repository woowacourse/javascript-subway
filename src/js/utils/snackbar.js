import { $ } from './DOM.js';

function showSnackBar(contents) {
  $('#snack-bar').innerText = contents;
  $('#snack-bar').classList.toggle('show');
  setTimeout(() => {
    $('#snack-bar').classList.toggle('show');
  }, 3000);
}

export default showSnackBar;
