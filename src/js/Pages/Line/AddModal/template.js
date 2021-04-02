import { colorOptions } from '../../../utils/mock';

const subwayLineColorOptionTemplate = (color, index) => {
  const hasNewLine = (index + 1) % 7 === 0;
  // class 대신 data-set 속성을 사용한 이유는, 값을 가져와서 수정할 때 data-set 속성이
  // 1. index값을 안써도 됨 2. class를 뺐다 넣었다 하는 것보다 덮어씌우는 편이 낫다고 생각해서
  return `<button type="button" class="color-option" data-bg-color="${color}"></button> ${
    hasNewLine ? '<br/>' : ''
  }`;
};

const modal = ({ state: { stations }, modalKey }) => {
  return `
    <div class="modal modal-${modalKey}">
      <div class="modal-inner p-8">
        <button class="modal-close">
          <svg viewbox="0 0 40 40">
            <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
          </svg>
        </button>
        <header>
          <h2 class="text-center">🛤️ 노선 추가</h2>
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
          <div class="js-line-form__detail">
            <div class="d-flex items-center input-control">
              <label for="${modalKey}-up-station" class="input-label" hidden>상행역</label>
              <select id="${modalKey}-up-station" name="subway-line-up-station" class="mr-2">
                <option value="" selected disabled hidden>상행역</option>
                ${stations
                  .map(({ id, name }) => `<option value=${id}>${name}</option>`)
                  .join('')}
              </select>
              <label for="down-station" class="input-label" hidden
                >하행역</label
              >
              <select id="${modalKey}-down-station" name="subway-line-down-station">
                <option value="" selected disabled hidden>하행역</option>
                ${stations
                  .map(({ id, name }) => `<option value=${id}>${name}</option>`)
                  .join('')}
              </select>
            </div>
            <div class="input-control">
              <label for="distance" class="input-label" hidden
                >상행 하행역 거리</label>
              <input
                type="number"
                id="${modalKey}-distance"
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
                id="${modalKey}-duration"
                name="duration"
                class="input-field"
                placeholder="상행 하행역 시간"
                required
              />
            </div>
          </div>
          <div class="input-control">
            <div>
              <label for="subway-line-color" class="input-label" hidden
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
            <div id="${modalKey}-subway-line-color-preview" class="subway-line-color-preview"></div>
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
