import { colorOptions } from '/src/js/utils/mock.js';

const subwayLineColorOptionTemplate = (color, index) => {
  const hasNewLine = (index + 1) % 7 === 0;
  return `<button type="button" class="js-color-option color-option bg-${color}" data-color="bg-${color}"></button> ${
    hasNewLine ? '<br/>' : ''
  }`;
};

export const stationOptionTemplate = ({ id, name }) => `
  <option value="${id}">${name}</option>
`;

export const stationOptionListTemplate = (stations, defaultValue) => {
  const defaultValueTemplate = `<option value="" disabled selected hidden>${defaultValue}</option>`;

  return defaultValueTemplate + stations.map(station => stationOptionTemplate(station)).join('');
};

const linesPageModalTemplate = `
  <div id="line-add-modal" class="modal">
    <div class="modal-inner p-8">
      <button class="modal-close">
        <svg viewbox="0 0 40 40">
          <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
        </svg>
      </button>
      <header>
        <h2 class="text-center">🛤️ 노선 추가</h2>
      </header>
      <form id="line-add-form">
        <div class="input-control">
          <span class="js-subway-line-color-dot subway-line-color-dot"></span>
          <label for="subway-line-name" class="input-label" hidden
            >노선 이름</label
          >
          <input
            type="text"
            id="subway-line-name"
            name="subway-line-name"
            class="input-field"
            placeholder="노선 이름"
            required
          />
        </div>
        <div class="input-control">
          <label for="departure-station" hidden></label>
          <select
            id="departure-station"
            name="departure-station"
            class="input-field"
            required
          >
            <option value="" disabled selected hidden>출발역</option>
          </select>
          <label for="arrival-station" hidden></label>
          <select
            id="arrival-station"
            name="arrival-station"
            class="input-field"
            required
            disabled
          >
            <option value="" disabled selected hidden>종착역</option>
          </select>
        </div>
        <div class="input-control">
          <label for="duration" class="input-label" hidden>상행 하행역 시간</label>
          <input
            type="number"
            id="duration"
            name="arrival"
            class="input-field"
            placeholder="상행 하행역 시간"
            required
          />
          <label for="distance" class="input-label" hidden>상행 하행역 거리</label>
          <input
            type="number"
            id="distance"
            name="distance"
            class="input-field"
            placeholder="상행 하행역 거리"
            required
          />
        </div>
        <div class="input-control">
          <div>
            <label for="subway-line-color" class="input-label" hidden
              >간격 시간</label
            >
            <input
              type="hidden"
              id="subway-line-color"
              name="subway-line-color"
              class="input-field"
              placeholder="색상을 아래에서 선택해주세요."
              disabled
              required
            />
          </div>
        </div>
        <div class="subway-line-color-selector px-2">
          ${colorOptions.map(subwayLineColorOptionTemplate).join('')}
        </div>
        <div class="d-flex justify-end mt-3">
          <button
            type="submit"
            name="submit"
            class="input-submit bg-cyan-300"
          >
            확인
          </button>
        </div>
      </form>
    </div>
  </div>
`;

export const lineListItemTemplate = ({ id, name, color }) => `
  <li class="js-line-list-item line-list-item d-flex items-center py-2 relative" data-id="${id}" data-name="${name}">
    <span class="subway-line-color-dot ${color}"></span>
    <span class="w-100 pl-6 subway-line-list-item-name"
      >${name}</span
    >
    <button
      type="button"
      class="bg-gray-50 text-gray-500 text-sm mr-1 js-line-edit-button"
    >
      수정
    </button>
    <button
      type="button"
      class="bg-gray-50 text-gray-500 text-sm js-line-delete-button"
    >
      삭제
    </button>
  </li>
`;

const linesPageTemplate = (lineList = []) => `
  <div class="d-flex justify-center mt-5 w-100">
    <div class="w-100">
      <header class="my-4"></header>
      <main class="mt-10 d-flex justify-center">
        <div class="wrapper bg-white p-10">
          <div class="heading d-flex">
            <h2 class="mt-1 w-100">🛤️ 노선 관리</h2>
            <button
              type="button"
              id="create-line-button"
              class="modal-trigger-btn bg-cyan-300 ml-2"
            >
              노선 추가
            </button>
          </div>
          <ul class="js-line-list mt-3 pl-0">
            ${lineList.map(line => lineListItemTemplate(line)).join('')}
          </ul>
        </div>
      </main>
    </div>
  </div>
  ${linesPageModalTemplate}
`;

export default linesPageTemplate;
