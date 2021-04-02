const snackbar = {
  cancel: function () {
    clearTimeout(this.timeoutId);
    this.timeoutId = null;
  },
  close: function () {
    this.$element.classList.remove('open');
  },
  open: function (message = '', ms = 3000) {
    this.cancel();
    this.$element.textContent = message;
    this.$element.classList.add('open');
    this.timeoutId = setTimeout(() => this.close(), ms);
  },
  init: function () {
    this.$element = document.querySelector('.snackbar');
  },
};

export default snackbar;
