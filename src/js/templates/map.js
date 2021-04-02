const getDistanceAndDurationTemplate = (distanceAndDuration) => {
  return distanceAndDuration
    ? `<span class="section-info">${distanceAndDuration.distance}km/${distanceAndDuration.duration}분</span>`
    : '';
};

const getMapStationTemplate = (stationData, lineColor, sectionData) => {
  const distanceAndDuration = sectionData.map((section) => ({
    distance: section.distance,
    duration: section.duration,
  }));

  return stationData
    .map(
      (station, i) =>
        `<li class="station-list">
          ${getDistanceAndDurationTemplate(distanceAndDuration[i])}
          <span class="map-station-name">${station.name}</span>
          <div class="section-line ${lineColor}"></div>
        </li>`,
    )
    .join('');
};

export const getMapLineTemplate = (lineData) => {
  return lineData
    .map(
      (line) => `
    <ul>
      <span class="map-line-name text-white ${line.color}">${line.name}</span>
      ${getMapStationTemplate(line.stations, line.color, line.sections)}
      <span class="map-line-name text-white ${line.color}">${line.name}</span>
    </ul>
  `,
    )
    .join('');
};

export const getFindingRouteMapTemplate = ({ stationNameList, lineColorList, distance, duration }) => {
  const sectionListTemplate = stationNameList
    .map(
      (stationName, i) =>
        `<li class="station-list">
          <span class="map-station-name">${stationName}</span>
          <div class="section-line finding-line ${lineColorList[i] ? lineColorList[i] : ''}"></div>
        </li>`,
    )
    .join('');

  return `
      <ul>
        <span class="map-line-name bg-white shadow mx-1">상행역</span>
        ${sectionListTemplate}
        <span class="map-line-name bg-white shadow mx-1">하행역</span>
      </ul>
      <div class="text-center">총 거리: ${distance}km / 총 시간: ${duration}분</div>
    `;
};

export const getFindingRouteOptionsTemplate = (stationData) => {
  const stationOptionsTemplate = stationData
    .map((station) => `<option value=${station.name}>${station.name}</option>`)
    .join('');
  return `
    <label for="up-station" class="input-label" hidden>상행역</label>
    <select id="up-station" class="up-station-selector mr-2" required>
      <option value="" selected disabled hidden>상행역</option>
      ${stationOptionsTemplate}
    </select>
    <label for="down-station" class="input-label" hidden>하행역</label>
    <select id="down-station" class="down-station-selector" required>
      <option value="" selected disabled hidden>하행역</option>
      ${stationOptionsTemplate}
    </select>
    <label for="finding-standard" class="input-label" hidden>검색기준</label>
    <select id="finding-standard" class="finding-standard-selector" required>
      <option value="" selected disabled hidden>검색기준</option>
      <option value="DISTANCE">최소거리</option>
      <option value="DURATION">최소시간</option>
    </select>
  `;
};

export const getMapTemplate = () => `
  <section class="map-section">
    <nav class="map-nav-bar d-flex justify-center items-center flex-wrap">
      <button class="finding-route bg-white btn shadow mx-1">🔎 경로 조회</button>
      <button class="view-all-map bg-white btn shadow mx-1">🗺️ 전체 보기</button>
      <label for="view-selected-line" class="input-label" hidden>👀 라인별 보기</label>
      <select id="view-selected-line" class="line-selector bg-white shadow mx-1">
        <option value="" selected disabled hidden>👀 라인별 보기</option>
      </select>
    </nav>
    <div class="map-wrapper"></div>
    <div class="modal">
      <div class="modal-inner add-modal p-8">
      <button class="modal-close">
        <svg viewbox="0 0 40 40">
          <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
        </svg>
      </button> 
      <header>
        <h2 class="text-center">🔎 경로 조회</h2>
      </header>
      <form class="modal__finding-route-form">
        <div class="modal__finding-route-option-wrapper d-flex items-center input-control"></div>
        <div class="d-flex justify-end mt-3">
          <button
            type="submit"
            name="submit"
            class="modal__finding-route-submit-button input-submit bg-cyan-300">
            확인
          </button>
        </div>
      </form>
    </div>
  </section>
`;
