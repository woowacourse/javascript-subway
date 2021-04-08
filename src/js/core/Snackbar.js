import { $ } from '../utils/DOM';

class Snackbar {
  constructor() {}

  show(message) {
    $('.snackbar').innerHTML = message;
    $('.snackbar').classList.toggle('show');
    setTimeout(() => {
      $('.snackbar').classList.toggle('show');
    }, 3000);
  }
}

export default Snackbar;
