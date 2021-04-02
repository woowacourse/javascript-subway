import { optionTemplate } from '../../templates/option';

const transferLineTemplate = transferLines => `
  <div class="js-transfer-lines ml-3">
    ${transferLines.map(
      line => `
        <button class="btn">${line.name}</button>
      `
    )}
  </div>
`;

const mapListItemTemplate = ({ stationName, duration, distance, transferLines = [] }) => `
  <li class="js-map-list-item map-list-item">
    <div class="d-flex flex-col pl-3">
      <div class="d-flex items-center">
        <div class="js-map-list-item-circle map-list-item-circle"></div>
        <span class="station-name">${stationName}</span>
        ${transferLines.length > 0 ? transferLineTemplate(transferLines) : ''}
      </div>
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
      mapListItemTemplate({ stationName: upStation.name, distance, duration, transferLines })
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
