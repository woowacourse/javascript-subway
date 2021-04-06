export const debounce = (fn, delay) => {
  let timerId = null;

  return arg => {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      fn(arg);
    }, delay);
  };
};
