import { REQUEST_METHOD } from '../constants';

export const $ = selector => document.querySelector(selector);

export const $$ = selector => document.querySelectorAll(selector);

export const getFormData = formCollections => {
  return Array.from(formCollections)
    .filter(({ name }) => name)
    .reduce(
      (result, { name, value }) => ({
        ...result,
        [name]: value,
      }),
      {},
    );
};

export const showValidMessage = ($message, { isValid, message }) => {
  $message.classList.toggle('valid', isValid);
  $message.innerHTML = message;
};

export const isAllElementsHaveClass = ($elements, className) => {
  return [...$elements].every(element => element.classList.contains(className));
};

export const clearForm = $form => {
  $form.reset();
  $form.elements.forEach(element => {
    if (element.nodeName === 'INPUT' && element.type === 'text') {
      element.focus();
      return;
    }
  });
};
