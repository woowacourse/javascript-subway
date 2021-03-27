function $(target) {
  return document.querySelector(target);
}

function onModalShow() {
  $('.modal').classList.add('open');
}

function onModalClose() {
  $('.modal').classList.remove('open');
}

function resetInput($resetTarget, $focusTarget) {
  $resetTarget.reset();
  $focusTarget.focus();
}

export { $, onModalShow, onModalClose, resetInput };
