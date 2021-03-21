export const showElement = (element) => element.classList.remove('d-none');

export const hideElement = (element) => element.classList.add('d-none');

export const setFontColorGreen = (element) => {
  element.classList.remove('text-red-600');
  element.classList.add('text-green-600');
};

export const setFontColorRed = (element) => {
  element.classList.remove('text-green-600');
  element.classList.add('text-red-600');
};
