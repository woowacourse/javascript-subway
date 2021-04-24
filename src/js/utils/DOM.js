function $(target) {
  return document.querySelector(target);
}

function onModalShow() {
  $('.modal').classList.add('open');

  $('body').classList.add('disable-scroll');
  $('.modal').addEventListener('mouseup', ({ currentTarget, target }) => {
    if (currentTarget === target) {
      onModalClose();
    }
  });
}

function onModalClose() {
  $('.modal').classList.remove('open');
  $('body').classList.remove('disable-scroll');
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
