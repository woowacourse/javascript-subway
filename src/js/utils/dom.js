export const $ = selector => document.querySelector(selector);

export const showElement = selector => $(selector).classList.remove('d-none');
export const hideElement = selector => $(selector).classList.add('d-none');
