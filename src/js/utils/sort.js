function sorted(firstValue, secondValue, sortBy, order) {
  if (firstValue[sortBy] > secondValue[sortBy]) {
    return -1;
  }

  if (firstValue[sortBy] < secondValue[sortBy]) {
    return 0;
  }

  return 1;
}

export default sorted;
