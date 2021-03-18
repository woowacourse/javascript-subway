import { $ } from "../utils/DOM.js";

const staticElements = {
  $nav: $("header > nav"),
  $main: $("main"),
  $modal: $(".js-modal"),
  $modalInner: $(".js-modal-inner"),
  $modalCloseBtn: $(".js-modal-close-btn"),
};

export default staticElements;
