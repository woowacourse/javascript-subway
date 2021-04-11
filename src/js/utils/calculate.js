export const sum = (array, initialValue = 0) =>
  array.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue);
