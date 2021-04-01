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

export const createStationListItem = (station, displayModifyBtn = true) => {
  return `
      <li
        data-station-id="${station.id}"
        data-station-name="${station.name}"
        class="station-list-item d-flex items-center"
        >
        <span class="js-station-name w-100">${station.name}</span>
        ${
          displayModifyBtn === true
            ? `<button
                type="button"
                class="js-modify-btn bg-gray-50 text-gray-500 text-sm mr-1"
              >
                수정
              </button>`
            : ""
        }
        <button
          type="button"
          class="js-delete-btn bg-gray-50 text-gray-500 text-sm"
        >
          삭제
        </button>
      </li>
    `;
};

const createStationDot = (station, borderColorClass) => {
  return `
    <li class="map-item-station-dot ${borderColorClass}" data-station-name="${station.name}"></li>
  `;
};

export const createMap = (line) => {
  const borderColorClass = line.color.replace("bg", "border");

  return `
    <ul class="map-item ${borderColorClass}">
      <li class="map-item-line ${line.color}">${line.name}</li>
      ${line.stations.reduce((template, station) => {
        return `${template}${createStationDot(station, borderColorClass)}`;
      }, "")}
    </ul>
  `;
};
