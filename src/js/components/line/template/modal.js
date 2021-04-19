import { colorOptions } from '../../../utils/mock.js';

const subwayLineColorOptionTemplate = (color, index) => {
  const hasNewLine = (index + 1) % 7 === 0;
  return `<button type="button" class="color-option" data-bg-color="${color}"></button> ${
    hasNewLine ? '<br/>' : ''
  }`;
};

const lineFormDetail = (stations) => `
  <div class="js-line-form__detail">
    <div class="d-flex items-center input-control mt-3">
      <label for="up-station" class="input-label" hidden>상행역</label>
      <select id="up-station" name="subway-line-up-station" class="mr-2">
        <option value="" selected disabled hidden>상행역</option>
        ${stations
          .map(({ id, name }) => `<option value=${id}>${name}</option>`)
          .join('')}
      </select>
      <label for="down-station" class="input-label" hidden
        >하행역</label
      >
      <select id="down-station" name="subway-line-down-station">
        <option value="" selected disabled hidden>하행역</option>
        ${stations
          .map(({ id, name }) => `<option value=${id}>${name}</option>`)
          .join('')}
      </select>
    </div>
    <div class="input-control mt-3">
      <label for="distance" class="input-label" hidden
        >상행 하행역 거리</label>
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
  </div>
  `;

const linesModal = () => {
  return `
    <div class="modal">
      <div class="modal-inner p-8">
        <button class="modal-close">
          <svg viewbox="0 0 40 40">
            <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
          </svg>
        </button>
        <header>
          <h2 class="text-center" id="line-title">🛤️ 노선 추가</h2>
        </header>
        <form id="line-form">
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
              required
            />
          </div>
          <div class="js-line-detail-container"></div>
          <div class="input-control">
            <div>
              <label for="subway-line-color" class="input-label" hidden
                >색상</label
              >
              <input
                type="hidden"
                id="subway-line-color"
                name="subway-line-color"
                class="input-field"
                disabled
                required
              />
            </div>
          </div>
          <div class="color-preview mt-3">
            색상을 아래에서 선택해주세요.
            <div id="subway-line-color-preview"></div>
          </div>
          <div class="js-subway-line-color-selector user-select-none px-2 text-center">
            ${colorOptions.map(subwayLineColorOptionTemplate).join('')}
          </div>
          <div class="d-flex justify-end mt-3">
            <button
              class="input-submit bg-cyan-300"
              name="submit"
            >
              확인
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
};

export { linesModal, lineFormDetail };
