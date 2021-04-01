const stationColorTemplate = (lineColor, stationName) => {
  return `
    <div class="d-flex items-center">
      <div class="d-flex flex-col justify-center items-center">
        <div class="station-name font-semibold text-center d-flex justify-center items-center">${stationName}</div>
        <div class="d-flex justify-center items-center">
          <span class="subway-line-color-dot"></span>
          <div class="horizontal-line-bar" style="background-color: ${lineColor}"></div>
        </div>
      </div>
    </div>
    `;
};

const lineListTemplate = (line) => {
  return `
    <li class="line-list-item list-style-none d-flex items-center relative">
      <div class="line-name font-semibold" style="border-color: ${line.color}">${line.name}</div>
      <div class="station-container d-flex justify-center items-center">
        ${line.stations.map((station) => stationColorTemplate(line.color, station.name)).join('')}
      </div>
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
