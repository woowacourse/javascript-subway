import { $ } from '../utils/DOM';

class Snackbar {
  constructor() {
    this.throttle = null;
  }

  show(message) {
    $('.snackbar').innerHTML = message;
    $('.snackbar').classList.toggle('show');

    this.throttle = setTimeout(() => {
      this.throttle = null;
      $('.snackbar').classList.toggle('show');
    }, 3000);
  }
}

export default Snackbar;
