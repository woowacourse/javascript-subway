import $ from './querySelector';

const show = selector => {
  $(selector).classList.remove('hidden');
};

const hide = selector => {
  $(selector).classList.add('hidden');
};

export { show, hide };
