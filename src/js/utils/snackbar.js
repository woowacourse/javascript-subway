import { $ } from "./DOM.js";

const snackbar = (() => {
  const $snackbar = $(".js-snackbar");
  let timer = null;

  return {
    show: (message) => {
      $snackbar.textContent = message;
      $snackbar.classList.add("show");

      timer = setTimeout(() => {
        // eslint-disable-next-line no-unused-vars
        timer = null;
        $snackbar.classList.remove("show");
      }, 3000);
    },
  };
})();

export default snackbar;
