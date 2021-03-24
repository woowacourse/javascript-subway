export const debounce = (() => {
  let timer;

  return (callback, time) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(callback, time);
  };
})();
