export const selectorOption = ({ value = '', text = '', selected = false, disabled = false }) =>
  `<option value="${value}" ${selected ? 'selected' : ''} ${disabled ? 'disabled' : ''} >${text}</option>>`;
