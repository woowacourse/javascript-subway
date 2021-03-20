const debounceGenerator = () => {
  let timerId;

  return (func, delay) => {
    clearTimeout(timerId);
    timerId = setTimeout(func, delay);
  };
};

const debounce = debounceGenerator();

export default debounce;
