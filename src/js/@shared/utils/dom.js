export const $ = (selector, target = document) => target.querySelector(selector);

export const parseToElements = template => new DOMParser().parseFromString(template, 'text/html');

export const clearInput = (...$inputs) =>
  $inputs.forEach($input => {
    $input.value = '';
  });
