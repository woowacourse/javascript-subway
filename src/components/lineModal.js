import { SELECTOR_CLASS, SELECTOR_ID, SELECTOR_NAME, STATE_KEY } from "../constants";
import { delegateLineModalClickEvent, delegateLineModalSubmitEvent } from "../delegators/lineModal";
import Observer from "../lib/Observer";
import { $ } from '../utils/dom.js';
import { colorOptions } from '../utils/mock.js';

export default class LineModal extends Observer {
  #targetSelector;
  #parentSelector;
  #state;

  constructor(state, targetSelector = `#${SELECTOR_ID.LINE_FORM}`, parentSelector = `.${SELECTOR_CLASS.MODAL}`) {
    super();
    this.#parentSelector = parentSelector;
    this.#targetSelector = targetSelector;
    this.#state = state;
  }

  renderPage() {}

  renderComponent() {
    const modal = $(this.#parentSelector);
    if (!modal) return;
    const targetLineId = this.#state.get(STATE_KEY.TARGET_LINE_ID);
    const targetLine = this.#state.get(STATE_KEY.LINE_LIST).find(line => line.id === Number(targetLineId));
    modal.innerHTML = this.#getModalTemplate(targetLine);
    $(`.${SELECTOR_CLASS.LINE_COLOR_PICKER}`).innerHTML = colorOptions
      .map((color) => this.#getSubwayLineColorOptionTemplate(color))
      .join('');
    
    this.#initEvents();
  }

  #initEvents() {
    $(this.#parentSelector).addEventListener('click', delegateLineModalClickEvent);
    $(this.#targetSelector).addEventListener('submit', delegateLineModalSubmitEvent);
  }

  #getModalTemplate(lineItem) {
    return `
      <div class="${SELECTOR_CLASS.MODAL_INNER} wrapper p-8">
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
        <form id="${SELECTOR_ID.LINE_FORM}"
          class="${lineItem ? SELECTOR_CLASS.LINE_UPDATE_FORM : SELECTOR_CLASS.LINE_REGISTER_FORM}">
          <div class="input-control">
            <label for="${SELECTOR_ID.LINE_MODAL_NAME_INPUT}" class="input-label" hidden
              >노선 이름</label
            >
            <input
              type="text"
              id="${SELECTOR_ID.LINE_MODAL_NAME_INPUT}"
              name="${SELECTOR_NAME.LINE_NAME}"
              class="input-field"
              placeholder="노선 이름"
              value="${lineItem ? lineItem.name : ''}"
              required
            />
          </div>
          ${lineItem ? '' : `
            <div class="d-flex items-center input-control">
              <label for="up-station" class="input-label" hidden>상행역</label>
              <select id="${SELECTOR_ID.LINE_MODAL_UP_STATION_INPUT}" name="${SELECTOR_NAME.UP_STATION}" class="mr-2" required>
                <option value="${lineItem ? lineItem.upStationId : ''}" selected disabled hidden>${lineItem ? lineItem.upStationName : '상행역'}</option>
                ${this.#state
                  .get(STATE_KEY.STATION_LIST)
                  .map(stationItem => `<option value="${stationItem.id}">${stationItem.name}</option>`)
                  .join('')}
              </select>
              <label for="down-station" class="input-label" hidden>하행역</label>
              <select id="${SELECTOR_ID.LINE_MODAL_DOWN_STATION_INPUT}"" name="${SELECTOR_NAME.DOWN_STATION}" required>
                <option value="${lineItem ? lineItem.downStationId : ''}" selected disabled hidden>${lineItem ? lineItem.downStationName : '하행역'}</option>
                <${this.#state
                  .get(STATE_KEY.STATION_LIST)
                  .map(stationItem => `<option value="${stationItem.id}">${stationItem.name}</option>`)
                  .join('')}
              </select>
            </div>
            <div class="input-control">
              <label for="${SELECTOR_ID.LINE_MODAL_DISTANCE_INPUT}" class="input-label" hidden
                >상행 하행역 거리</label
              >
              <input
                type="number"
                id="${SELECTOR_ID.LINE_MODAL_DISTANCE_INPUT}"
                name="${SELECTOR_NAME.LINE_DISTANCE}"
                class="input-field mr-2"
                placeholder="상행 하행역 거리(km)"
                min="0"
                value="${lineItem ? lineItem.distance : ''}"
                required
              />
              <label for="${SELECTOR_ID.LINE_MODAL_DURATION_INPUT}" class="input-label" hidden
                >상행 하행역 시간</label
              >
              <input
                type="number"
                id="${SELECTOR_ID.LINE_MODAL_DURATION_INPUT}"
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
            <div class="d-flex">
              <label for="${SELECTOR_ID.LINE_MODAL_COLOR_INDICATOR}" class="input-label" hidden
                >색상</label
              >
              <div class="${SELECTOR_CLASS.LINE_COLOR_PICKER} d-flex flex-wrap px-2"></div>
              <input
                type="text"
                id="${SELECTOR_ID.LINE_MODAL_COLOR_INDICATOR}"
                name="${SELECTOR_NAME.LINE_COLOR}"
                class="color-input-field ${lineItem ? `${lineItem.color}` : ''}"
                placeholder="노선 색상"
                ${lineItem ? `data-color="${lineItem.color}"` : '' }
                disabled
                required
              />
            </div>
          </div>
          <div class="d-flex justify-end mt-3">
            ${lineItem ? `<button
              id="${SELECTOR_ID.LINE_MODAL_UPDATE_SUBMIT}"
              type="submit"
              name="${SELECTOR_ID.LINE_MODAL_UPDATE_SUBMIT}"
              class="input-submit bg-cyan-300"
            >
              노선 수정
            </button>` : `<button
              id="${SELECTOR_ID.LINE_MODAL_REGISTER_SUBMIT}"
              type="submit"
              name="${SELECTOR_ID.LINE_MODAL_REGISTER_SUBMIT}"
              class="input-submit bg-cyan-300"
            >
              노선 추가
            </button>`}
          </div>
        </form>
      </div>
    `;
  }

  #getSubwayLineColorOptionTemplate(color) {
    return `<button type="button" class="${SELECTOR_CLASS.COLOR_OPTION} bg-${color}" data-color="${color}"></button>`;
  }
}
