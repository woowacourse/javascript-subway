const debounce = (func, ms) => {
  let timerId;

  return (...parameters) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => func(...parameters), ms);
  };
};

export default debounce;
