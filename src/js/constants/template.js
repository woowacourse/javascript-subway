export const subwayLineColorOptionTemplate = (color, index) => {
  const hasNewLine = (index + 1) % 7 === 0;
  return `
    <label class="color-option">
      <input data-color="bg-${color}" name="subway-line-color" value="bg-${color}" type="radio" required />
      <span class="radio bg-${color}"></span>
    </label>
    ${hasNewLine ? "<br/>" : ""}
  `;
};

export const createStationSelectOption = (station) =>
  `<option value="${station.id}">${station.name}</option>`;
