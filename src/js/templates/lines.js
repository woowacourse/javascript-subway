<<<<<<< HEAD
=======
import { colorOptions } from '../utils/mock';

export const selectedColorTemplate = () => `
  <button type="button" class="selected-color-button color-option"></button>
    <div class="ml-2">
      색을 아래에서 선택해주세요.
    </div>
  `;

const getStationOptionTemplate = (stationName) => `<option>${stationName}</option>`;

export const getStationOptionsTemplate = (stations) =>
  stations.map((station) => getStationOptionTemplate(station.name)).join('');

const lineColorOptionTemplate = (color, index) => {
  const hasNewLine = (index + 1) % 7 === 0;
  return `<button type="button" class="color-option bg-${color}"></button> ${hasNewLine ? '<br/>' : ''}`;
};

export const getLineListTemplate = ({ lineName, color }) => `
  <li class="line-list-item" data-line-name=${lineName}>
    <div class="d-flex items-center py-2">
      <span class="subway-line-color-dot ${color}"></span>
      <span class="w-100 pl-6 subway-line-list-item-name">${lineName}</span>
      <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1">수정</button>
      <button type="button" class="bg-gray-50 text-gray-500 text-sm">삭제</button>
    </div>
    <hr class="my-0" />
  </li>
`;

>>>>>>> 4adf8df... feat: 지하철 노선을 등록하는 기능 구현
export const getLinesTemplate = () => `
  <div class="wrapper bg-white p-10">
    <div class="heading d-flex">
      <h2 class="mt-1 w-100">🛤️ 노선 관리</h2>
<<<<<<< HEAD
      <button type="button" class="create-line-btn modal-trigger-btn bg-cyan-300 ml-2">노선 추가</button>
=======
        <button type="button" class="create-line-btn modal-trigger-btn bg-cyan-300 ml-2">등록</button>
>>>>>>> 4adf8df... feat: 지하철 노선을 등록하는 기능 구현
    </div>
    <ul class="line-list-wrapper mt-3 pl-0"></ul>
  </div>
<<<<<<< HEAD
=======
  <div class="modal">
    <div class="modal-inner line p-8">
      <button class="modal-close">
        <svg viewbox="0 0 40 40">
          <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
        </svg>
      </button>
      <header>
        <h2 class="text-center">🛤️ 노선 추가</h2>
      </header>
      <form class="modal__line-form">
        <div class="input-control">
          <label for="subway-line-name" class="input-label" hidden
            >노선 이름</label
          >
          <input
            type="text"
            id="subway-line-name"
            name="subway-line-name"
            class="input-field"
            placeholder="노선 이름"
            minlength="2"
            maxlength="10"
            required
          />
        </div>
        <div class="d-flex items-center input-control">
          <label for="up-station" class="input-label" hidden>상행역</label>
          <select id="up-station" class="station-selector mr-2">
            <option value="" class="station-options" selected disabled hidden>상행역</option>
          </select>
          <label for="down-station" class="input-label" hidden
            >하행역</label
          >
          <select id="down-station">
            <option value="" class="station-options" selected disabled hidden>하행역</option>
          </select>
        </div>
        <div class="input-control">
          <label for="distance" class="input-label" hidden
            >상행 하행역 거리</label
          >
          <input
            type="number"
            id="distance"
            name="distance"
            class="input-field mr-2"
            placeholder="상행 하행역 거리"
            required
          />
          <label for="duration" class="input-label" hidden
            >상행 하행역 시간</label
          >
          <input
            type="number"
            id="duration"
            name="arrival"
            class="input-field"
            placeholder="상행 하행역 시간"
            required
          />
        </div>
        <div class="selected-color justify-center">
        </div>
        <div class="subway-line-color-selector select-none w-100 text-center">
          ${colorOptions.map(lineColorOptionTemplate).join('')}
        </div>
        <div class="d-flex justify-end mt-3">
          <button
            type="submit"
            name="submit"
            class="modal__line-submit-button input-submit bg-cyan-300"
          >
            확인
          </button>
        </div>
      </form>
    </div>
</div>
>>>>>>> 4adf8df... feat: 지하철 노선을 등록하는 기능 구현
`;
