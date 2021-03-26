function $(target) {
  return document.querySelector(target);
}

function onModalShow() {
  $('.modal').classList.add('open');
}

function onModalClose() {
  $('.modal').classList.remove('open');
}
export { $, onModalShow, onModalClose };
