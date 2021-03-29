export const selectorOption = ({ value = '', option = '', selected = false, disabled = false }) =>
  `<option value="${value}" ${selected ? 'selected' : ''} ${disabled ? 'disabled' : ''} >${option}</option>>`;
