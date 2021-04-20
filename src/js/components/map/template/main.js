const mainTemplate = ({ lines }) => {
  return `
    <div class="wrapper bg-white p-10">
      <div class="heading d-flex">
        <h2 class="mt-1 w-100">🗺️ 전체 보기</h2>
      </div>
      ${lineSelector(lines)}
      <div class="js-map-line-container mt-4"></div>
    </div>
  `;
};

const lineSelector = (lines) => {
  return `
    <form class="input-control">
      <select class="js-map-form__select">
        <option value="" selected disabled hidden>노선을 선택해 주세요.</option>
        ${lines.map((line) => {
          return `<option value="${line.id}">${line.name}</option>`;
        })}
      </select>
    </form>
  `;
};

const subwayMapLine = ({ name, id, color, stations, sections }) => {
  const [firstStaion, ...leftStations] = stations;
  return `
    <div class="d-flex flex-wrap">
      <span class="subway-guide-line"></span>
      ${stationInLine(firstStaion, id)}
      ${sections
        .map(
          (section, idx) =>
            stationFollowLine(section, color) +
            stationInLine(leftStations[idx], id)
        )
        .join('')}
    </div>
  `;
};

const stationFollowLine = ({ distance, duration }, lineColor) => {
  return `
    <div class="guide-line-container d-flex">
      <span class="line-section-distance">${distance}km</span>
      <span class="subway-guide-line bg-${lineColor}"></span>
    </div>
    <div class="guide-line-container d-flex">
      <span class="line-section-duration">${duration}분</span>
      <span class="subway-guide-line bg-${lineColor}"></span>
    </div>
  `;
};

const stationInLine = ({ name, usedLine }, lineId) => {
  return `
    <div class="station-in-line my-5">
      <span class="name-tag">${name}</span>
      <div class="ic-line-container">
        ${usedLine
          .map((line) => {
            if (line.id !== lineId) return icLineContainer(line);
          })
          .join('')}
      </div>
      ${usedLine.length > 1 ? icStation() : ''}
    </div>
  `;
};

const icLineContainer = ({ color }) => {
  return `
    <span class="ic-line-color-dot mr-1 bg-${color}"></span>
  `;
};

const icStation = () => {
  return `
    <div class="ic-station"></div>
  `;
};

export { mainTemplate, subwayMapLine };
