import { SELECTOR_CLASS, SELECTOR_ID, SELECTOR_NAME, STATE_KEY } from "../constants";
import { delegateLineModalClickEvent, delegateLineModalSubmitEvent } from "../delegators/lineModal";
import Observer from "../lib/Observer";
import { $ } from '../utils/dom.js';
import { colorOptions } from '../utils/mock.js';

export default class LineModal extends Observer {
  #targetSelector;
  #parentSelector;
  #state;

  constructor(state, targetSelector = `#${SELECTOR_ID.SUBWAY_LINE_FORM}`, parentSelector = `.${SELECTOR_CLASS.MODAL}`) {
    super();
    this.#parentSelector = parentSelector;
    this.#targetSelector = targetSelector;
    this.#state = state;
  }

  renderPage() {}

  renderComponent() {
    const targetLineId = this.#state.get(STATE_KEY.TARGET_LINE_ID);
    const targetLine = this.#state.get(STATE_KEY.LINE_LIST).find(line => line.id === Number(targetLineId));
    $(this.#parentSelector).innerHTML = this.#getModalTemplate(targetLine);
    $(`.${SELECTOR_CLASS.SUBWAY_LINE_COLOR_PICKER}`).innerHTML = colorOptions
      .map((color, index) => this.#getSubwayLineColorOptionTemplate(color, index))
      .join('');
    
    this.#initEvents();
  }

  #initEvents() {
    $(this.#parentSelector).addEventListener('click', delegateLineModalClickEvent);
    $(this.#targetSelector).addEventListener('submit', delegateLineModalSubmitEvent);
  }

  #getModalTemplate(lineItem) {
    return `
      <div class="${SELECTOR_CLASS.MODAL_INNER} p-8">
        <button class="${SELECTOR_CLASS.LINE_LIST_MODAL_CLOSE} modal-close">
          <svg viewbox="0 0 40 40">
            <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
          </svg>
        </button>
        <header>
          <h2 class="text-center">
            ${lineItem ? '🛤️ 노선 수정' : '🛤️ 노선 추가'}
          </h2>
        </header>
        <form id="${SELECTOR_ID.SUBWAY_LINE_FORM}"
          class="${lineItem ? SELECTOR_CLASS.SUBWAY_LINE_UPDATE_FORM : SELECTOR_CLASS.SUBWAY_LINE_REGISTER_FORM}">
          <div class="input-control">
            <label for="subway-line-name" class="input-label" hidden
              >노선 이름</label
            >
            <input
              type="text"
              id="subway-line-name"
              name="${SELECTOR_NAME.SUBWAY_LINE_NAME}"
              class="input-field"
              placeholder="노선 이름"
              value="${lineItem ? lineItem.name : ''}"
              required
            />
          </div>
          ${lineItem ? '' : `
            <div class="d-flex items-center input-control">
              <label for="up-station" class="input-label" hidden>상행역</label>
              <select id="up-station" name="${SELECTOR_NAME.SUBWAY_UP_STATION}" class="mr-2">
                <option value="${lineItem ? lineItem.upStationId : ''}" selected disabled hidden>${lineItem ? lineItem.upStationName : '상행역'}</option>
                ${this.#state
                  .get(STATE_KEY.STATION_LIST)
                  .map(stationItem => `<option value="${stationItem.id}">${stationItem.name}</option>`)
                  .join('')}
              </select>
              <label for="down-station" class="input-label" hidden>하행역</label>
              <select id="down-station"" name="${SELECTOR_NAME.SUBWAY_DOWN_STATION}">
                <option value="${lineItem ? lineItem.downStationId : ''}" selected disabled hidden>${lineItem ? lineItem.downStationName : '하행역'}</option>
                <${this.#state
                  .get(STATE_KEY.STATION_LIST)
                  .map(stationItem => `<option value="${stationItem.id}">${stationItem.name}</option>`)
                  .join('')}
              </select>
            </div>
            <div class="input-control">
              <label for="distance" class="input-label" hidden
                >상행 하행역 거리</label
              >
              <input
                type="number"
                id="distance"
                name="${SELECTOR_NAME.LINE_DISTANCE}"
                class="input-field mr-2"
                placeholder="상행 하행역 거리(km)"
                min="0"
                value="${lineItem ? lineItem.distance : ''}"
                required
              />
              <label for="duration" class="input-label" hidden
                >상행 하행역 시간</label
              >
              <input
                type="number"
                id="duration"
                name="${SELECTOR_NAME.LINE_DURATION}"
                class="input-field"
                placeholder="상행 하행역 시간(분)"
                min="0"
                value="${lineItem ? lineItem.duration : ''}"
                required
              />
            </div>
          `}
          
          <div class="input-control">
            <div>
              <label for="subway-line-color" class="input-label" hidden
                >색상</label
              >
              <input
                type="text"
                id="${SELECTOR_ID.SUBWAY_LINE_COLOR_INDICATOR}"
                name="subway-line-color"
                class="${lineItem ? `color-input-field ${lineItem.color}` : 'input-field'}"
                placeholder="색상을 아래에서 선택해주세요."
                ${lineItem ? `data-color="${lineItem.color}"` : '' }
                disabled
                required
              />
            </div>
          </div>
          <div class="${SELECTOR_CLASS.SUBWAY_LINE_COLOR_PICKER} px-2"></div>
          <div class="d-flex justify-end mt-3">
            ${lineItem ? `<button
              type="submit"
              name="submit"
              class="input-submit bg-cyan-300"
            >
              노선 수정
            </button>` : `<button
              type="submit"
              name="submit"
              class="input-submit bg-cyan-300"
            >
              노선 추가
            </button>`}
          </div>
        </form>
      </div>
    `;
  }

  // TODO: color picker 배열 고쳐서 빈자리 없게 만들기
  #getSubwayLineColorOptionTemplate(color, index) {
    const hasNewLine = (index + 1) % 7 === 0;
    return `<button type="button" class="${SELECTOR_CLASS.COLOR_OPTION} bg-${color}" data-color="${color}"></button> ${
      hasNewLine ? '<br/>' : ''
    }`;
  }
}
