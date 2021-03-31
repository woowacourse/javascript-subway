const stationTemplate = (lineColor, station) => {
  return `
    <div class="d-flex items-center relative">
      <div class="d-flex justify-center align-center">
        <span class="subway-line-color-dot" style="background-color: ${lineColor}"></span>
        <div class="vertical-line-bar" style="background-color: ${lineColor}"></div>
      </div>
      <div class="station-name ml-2 mr-2">${station.name}</div>
    </div>
    `;
};

const lineListTemplate = (line) => {
  return `
    <li class="section-list-item list-style-none">
        <div class="d-flex flex-col justify-center align-center">
            ${line.stations.map((station) => stationTemplate(line.color, station)).join('')}
        </div>
    </li>
  `;
};

export const subwayMapTemplate = (lineList) => {
  console.log(lineList);
  return `
  <div class="subway-map-container container wrapper p-10">
    <ul id="subway-map-list-container" class="d-flex justify-center">
      ${lineList.map((line) => lineListTemplate(line)).join('')}
    </ul>
  </div>
  `;
};
