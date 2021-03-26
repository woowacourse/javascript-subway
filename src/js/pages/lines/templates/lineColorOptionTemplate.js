function lineColorOptionTemplate(color, index) {
  const hasNewLine = (index + 1) % 7 === 0;
  return `<button type="button" class="color-option bg-${color}" data-color-option="bg-${color}"></button> ${
    hasNewLine ? '<br/>' : ''
  }`;
}

export default lineColorOptionTemplate;
