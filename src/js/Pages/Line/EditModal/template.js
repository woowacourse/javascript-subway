import { colorOptions } from '../../../utils/mock';

const subwayLineColorOptionTemplate = (color, index) => {
  const hasNewLine = (index + 1) % 7 === 0;
  return `<button type="button" class="color-option" data-bg-color="${color}"></button> ${
    hasNewLine ? '<br/>' : ''
  }`;
};

const modal = ({ modalKey }) => {
  return `
    <div class="modal ${modalKey}-modal">
      <div class="modal-inner p-8">
        <button class="modal-close">
          <svg viewbox="0 0 40 40">
            <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
          </svg>
        </button>
        <header>
          <h2 class="text-center">🛤️ 노선 수정</h2>
        </header>
        <form id="${modalKey}-line-form">
          <div class="input-control">
            <label for="name" class="input-label" hidden
              >노선 이름</label
            >
            <input
              type="text"
              id="${modalKey}-name"
              name="name"
              class="input-field"
              placeholder="노선 이름"
              required
            />
          </div>
          <div class="input-control">
            <div>
              <label for="${modalKey}-color" class="input-label" hidden
                >색상</label
              >
              <input
                type="hidden"
                id="${modalKey}-color"
                name="subway-line-color"
                class="input-field"
                disabled
                required
              />
            </div>
          </div>
          <div class="color-preview mt-3">
            색상을 아래에서 선택해주세요.
            <div id="${modalKey}-color-preview" class="subway-line-color-preview"></div>
          </div>
          <div class="${modalKey}-js-color-selector user-select-none px-2 text-center">
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

export default modal;
