import { colorOptions } from '../../../utils/mock';

const subwayLineColorOptionTemplate = (color, index) => {
  const hasNewLine = (index + 1) % 7 === 0;
  // class 대신 data-set 속성을 사용한 이유는, 값을 가져와서 수정할 때 data-set 속성이
  // 1. index값을 안써도 됨 2. class를 뺐다 넣었다 하는 것보다 덮어씌우는 편이 낫다고 생각해서
  return `<button type="button" class="color-option" data-bg-color="${color}"></button> ${
    hasNewLine ? '<br/>' : ''
  }`;
};

const modal = ({ modalKey }) => {
  return `
    <div class="modal modal-${modalKey}">
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
            <label for="subway-line-name" class="input-label" hidden
              >노선 이름</label
            >
            <input
              type="text"
              id="${modalKey}-subway-line-name"
              name="subway-line-name"
              class="input-field"
              placeholder="노선 이름"
              required
            />
          </div>
          <div class="input-control">
            <div>
              <label for="${modalKey}-subway-line-color" class="input-label" hidden
                >색상</label
              >
              <input
                type="hidden"
                id="${modalKey}-subway-line-color"
                name="subway-line-color"
                class="input-field"
                disabled
                required
              />
            </div>
          </div>
          <div class="color-preview mt-3">
            색상을 아래에서 선택해주세요.
            <div id="${modalKey}-subway-line-color-preview"></div>
          </div>
          <div class="${modalKey}-js-subway-line-color-selector user-select-none px-2 text-center">
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
