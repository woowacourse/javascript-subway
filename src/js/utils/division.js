const division = (array, n) => {
  const length = array.length;
  const count = Math.floor(length / n);
  const returnArray = [];

  for (let i = 0; i <= count; i++) {
    returnArray.push(array.splice(0, n));
  }

  return returnArray;
};

export default division;
