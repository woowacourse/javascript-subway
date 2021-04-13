import { optionTemplate } from '../../templates/option';

export const transferLinesTemplate = transferLines => `
  ${transferLines
    .map(
      line => `
        <button
          class="btn d-inline-flex items-center js-transfer-line-button transfer-line-button"
          data-line-id="${line.id}">
          <span class="subway-line-color-dot ${line.color}"></span>
          <span class="pl-6">${line.name}</span>
        </button>
      `
    )
    .join('')}
`;

const mapListItemTemplate = ({ stationId, stationName, duration, distance }) => `
  <li class="js-map-list-item map-list-item" data-station-id=${stationId}>
    <div class="d-flex flex-col pl-3">
      <div class="d-flex items-center">
        <div class="js-map-list-item-circle map-list-item-circle"></div>
        <span class="station-name">${stationName}</span>
      </div>
      <div class="js-transfer-lines transfer-lines ml-8 mt-4"></div>
      ${
        duration && distance
          ? `
            <div class="section-info d-flex items-center">
              <span class="section-duration">${duration}</span>
              <span class="section-distance">${distance}</span>
            </div>
          `
          : ''
      }
    </div>
  </li>
`;

export const mapListItems = sections => {
  return sections
    .map(({ upStation, distance, duration, transferLines }) =>
      mapListItemTemplate({ stationId: upStation.id, stationName: upStation.name, distance, duration, transferLines })
    )
    .join('');
};

const mapPageTemplate = (lines = []) => `
  <div class="d-flex justify-center mt-5 w-100">
    <div class="w-100">
      <header class="my-4"></header>
      <main id="map-container" class="mt-10 d-flex justify-center">
        <div class="wrapper bg-white p-10">
          <div class="heading">
            <h2 class="mt-1">🗺️ 전체 보기</h2>
          </div>
          <form class="d-flex items-center pl-1">
            <select id="line-select">
              <option value="" disabled selected hidden>노선 선택</option>
              ${lines.map(({ id, name }) => optionTemplate(id, name)).join('')}
            </select>
          </form>
          <ul class="js-map-list map-list mt-3" data-line-id=""></ul>
        </div>
      </main>
    </div>
  </div>
`;

export default mapPageTemplate;
