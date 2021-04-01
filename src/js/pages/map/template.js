import { optionTemplate } from '../../templates/option';

const mapListItemTemplate = ({ stationName, duration, distance }) => `
  <li class="js-map-list-item map-list-item">
    <div class="d-flex flex-col pl-3">
      <span class="station-name">${stationName}</span>
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
          <ul class="js-map-list map-list mt-3" data-line-id="">
            ${[{ stationName: '테스트1', duration: 10, distance: 10 }, { stationName: '테스트2' }]
              .map(item => mapListItemTemplate(item))
              .join('')}
          </ul>
        </div>
      </main>
    </div>
  </div>
`;

export default mapPageTemplate;
