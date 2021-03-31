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

function changeBackgroundColor($target, selectedColor) {
  $target.classList = [...$target.classList].filter(
    currentClass => currentClass.indexOf('bg-') === -1
  );
  $target.classList.add(selectedColor);
}

export { $, onModalShow, onModalClose, resetInput, changeBackgroundColor };
