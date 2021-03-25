const debounce = (() => {
  let timer = null;

  return (callback, delay) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      callback();
    }, delay);
  };
})();

export default debounce;
