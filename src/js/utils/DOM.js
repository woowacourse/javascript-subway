const $ = target => {
  return document.querySelector(target);
};

const onModalClose = () => {
  $('.modal').classList.remove('open');
  $('body').classList.remove('disable-scroll');
};

const onModalShow = () => {
  $('.modal').classList.add('open');

  $('body').classList.add('disable-scroll');
  $('.modal').addEventListener('mouseup', ({ currentTarget, target }) => {
    if (currentTarget === target) {
      onModalClose();
    }
  });
};

const resetInput = $resetTarget => {
  $resetTarget.reset();
};

const changeBackgroundColor = ($target, selectedColor) => {
  $target.classList = [...$target.classList].filter(
    currentClass => currentClass.indexOf('bg-') === -1
  );
  $target.classList.add(selectedColor);
};

export { $, onModalShow, onModalClose, resetInput, changeBackgroundColor };
