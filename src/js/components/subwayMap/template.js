const stationTemplate = (lineColor, stationName) => {
  return `
    <div class="station-item-container d-flex flex-col justify-center items-center my-2">
      <div class="station-name font-semibold text-center d-flex justify-center items-center px-3 pb-2">${stationName}</div>
      <div class="d-flex justify-center items-center w-100">
        <span class="subway-line-color-dot"></span>
        <div class="horizontal-line-bar" style="background-color: ${lineColor}"></div>
      </div>
    </div>
    `;
};

const lineListTemplate = (line) => {
  return `
  <li class="list-style-none mt-10">
    <span class="line-name font-semibold" style="border-color: ${line.color}">${line.name}</span>
    <li class="line-list-item list-style-none d-flex items-center relative">
      <div class="station-container d-flex flex-wrap items-end">
        ${line.stations.map((station) => stationTemplate(line.color, station.name)).join('')}
      </div>
    </li>
  </li>
  `;
};

export const subwayMapTemplate = (lineList) => {
  return `
    <ul class="subway-map-container d-flex flex-col justify-start bg-white">
      ${lineList.map((line) => lineListTemplate(line)).join('')}
    </ul>
  `;
};
