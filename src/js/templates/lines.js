import { colorOptions } from '/src/js/utils/mock.js';

const subwayLineColorOptionTemplate = (color, index) => {
  const hasNewLine = (index + 1) % 7 === 0;
  return `<button type="button" class="color-option bg-${color}"></button> ${hasNewLine ? '<br/>' : ''}`;
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
          <label for="departure-time" class="input-label" hidden
            >첫차 시간</label
          >
          <input
            type="text"
            id="departure-time"
            name="departure-time"
            class="input-field"
            placeholder="첫차시간 HH:MM"
            required
          />
          <label for="departure-time" class="input-label" hidden
            >막차 시간</label
          >
          <input
            type="text"
            id="arrival-time"
            name="arrival-time"
            class="input-field mx-2"
            placeholder="막차 시간 HH:MM"
            required
          />
          <label for="interval-time" class="input-label" hidden
            >간격 시간</label
          >
          <input
            type="text"
            id="interval-time"
            name="arrival-time"
            class="input-field"
            placeholder="간격"
            required
          />
        </div>
        <div class="input-control">
          <div>
            <label for="subway-line-color" class="input-label" hidden
              >간격 시간</label
            >
            <input
              type="text"
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

const linesPageTemplate = `
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
          <ul class="mt-3 pl-0">
            <li class="d-flex items-center py-2 relative">
              <span class="subway-line-color-dot bg-blue-400"></span>
              <span class="w-100 pl-6 subway-line-list-item-name"
                >1호선</span
              >
              <button
                type="button"
                class="bg-gray-50 text-gray-500 text-sm mr-1"
              >
                수정
              </button>
              <button
                type="button"
                class="bg-gray-50 text-gray-500 text-sm"
              >
                삭제
              </button>
            </li>
            <hr class="my-0" />
          </ul>
        </div>
      </main>
    </div>
  </div>
  ${linesPageModalTemplate}
`;

export default linesPageTemplate;
