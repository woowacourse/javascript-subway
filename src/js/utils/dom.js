export const $ = (selector) => {
  const selected = document.querySelectorAll(selector);

  return selected.length === 1 ? selected[0] : selected;
};

export const show = ($element) => {
  $element.classList.remove('d-none');
};

export const hide = ($element) => {
  $element.classList.add('d-none');
};
