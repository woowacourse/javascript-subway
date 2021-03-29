const debounceGenerator = () => {
  let timerId = null;

  return (func, delay) => {
    clearTimeout(timerId);
    timerId = setTimeout(func, delay);
  };
};

const debounce = debounceGenerator();

export default debounce;
