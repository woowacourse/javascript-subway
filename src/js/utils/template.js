const createOptionTemplate = (value, innerText, isSelected) => {
  return `<option value="${value}" ${
    isSelected ? 'selected' : ''
  }>${innerText}</option>`;
};

export { createOptionTemplate };
