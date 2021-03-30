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

export const createStationListItem = (station) => {
  return `
      <li
        data-station-id="${station.id}"
        data-station-name="${station.name}"
        class="station-list-item d-flex items-center"
        >
        <span class="js-station-name w-100">${station.name}</span>
        <button
          type="button"
          class="js-modify-btn bg-gray-50 text-gray-500 text-sm mr-1"
        >
          수정
        </button>
        <button
          type="button"
          class="js-delete-btn bg-gray-50 text-gray-500 text-sm"
        >
          삭제
        </button>
      </li>
    `;
};
