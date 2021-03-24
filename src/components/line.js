import { SELECTOR_CLASS, SELECTOR_ID, PAGE_TITLE, FILE_PATH, STATE_KEY, SELECTOR_NAME } from '../constants.js';
import Observer from '../lib/Observer.js';
import { $, setHeadTagAttribute } from '../utils/dom.js';
import { colorOptions } from '../utils/mock.js';
import { state } from '../store.js';

export default class Line extends Observer {
  #targetSelector;
  #parentSelector;
  #state;

  constructor(state, targetSelector = `#${SELECTOR_ID.LINE_LIST}`, parentSelector = `#${SELECTOR_ID.MAIN_CONTAINER}`) {
    super();
    this.#targetSelector = targetSelector;
    this.#parentSelector = parentSelector;
    this.#state = state;
  }

  renderPage() {
    setHeadTagAttribute(PAGE_TITLE.LINES, FILE_PATH.LINES_CSS);
    $(this.#parentSelector).innerHTML = this.#getWrapperTemplate();
    $(`.${SELECTOR_CLASS.MODAL}`).innerHTML = this.#getModalTemplate();
    $(`.${SELECTOR_CLASS.SUBWAY_LINE_COLOR_PICKER}`).innerHTML = colorOptions
      .map((color, index) => this.#getSubwayLineColorOptionTemplate(color, index))
      .join('');
  }

  renderComponent() {
    $(this.#targetSelector).innerHTML = this.#getListListTemplate();
  }

  #getWrapperTemplate() {
    return `
      <div data-test-id="lines" class="wrapper bg-white p-10 fade-in">
        <div class="heading d-flex">
          <h2 class="mt-1 w-100">🛤️ 노선 관리</h2>
          <button type="button" class="${SELECTOR_CLASS.MODAL_OPEN_BUTTON} modal-trigger-btn bg-cyan-300 ml-2">노선 추가</button>
        </div>
        <ul id="${SELECTOR_ID.LINE_LIST}" class="mt-3 pl-0"></ul>
      </div>
    `;
  }

  #getListListTemplate() {
    return this.#state.get(STATE_KEY.LINE_LIST).map(this.#getLineTemplate).join('');
  }

  // TODO: line의 추가 정보 출력 여부 결정
  #getLineTemplate(line) {
    return `
      <li data-line-id="${line.id}" class="${SELECTOR_CLASS.LINE_LIST_ITEM} d-flex items-center py-2 relative">
        <span class="subway-line-color-dot ${line.color}"></span>
        <span class="w-100 pl-6 subway-line-list-item-name">${line.name}</span>
        <button type="button" data-line-id="${line.id}" class="bg-gray-50 text-gray-500 text-sm mr-1">수정</button>
        <button type="button" data-line-id="${line.id}" class="${SELECTOR_CLASS.LINE_DELETE_BUTTON} bg-gray-50 text-gray-500 text-sm">삭제</button>
      </li>
      <hr class="my-0" />
    `;
  }

  #getModalTemplate() {
    return `
      <div class="${SELECTOR_CLASS.MODAL_INNER} p-8">
        <button class="${SELECTOR_CLASS.MODAL_CLOSE}">
          <svg viewbox="0 0 40 40">
            <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
          </svg>
        </button>
        <header>
          <h2 class="text-center">🛤️ 노선 추가</h2>
        </header>
        <form id="${SELECTOR_ID.SUBWAY_LINE_FORM}">
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
              required
            />
          </div>
          <div class="d-flex items-center input-control">
            <label for="up-station" class="input-label" hidden>상행역</label>
            <select id="up-station" name="${SELECTOR_NAME.SUBWAY_UP_STATION}" class="mr-2">
              <option value="" selected disabled hidden>상행역</option>
              ${state
                .get(STATE_KEY.STATION_LIST)
                .map(stationItem => `<option value="${stationItem.id}">${stationItem.name}</option>`)
                .join('')}
            </select>
            <label for="down-station" class="input-label" hidden>하행역</label>
            <select id="down-station"" name="${SELECTOR_NAME.SUBWAY_DOWN_STATION}">
              <option value="" selected disabled hidden>하행역</option>
              <${state
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
              required
            />
          </div>
          <div class="input-control">
            <div>
              <label for="subway-line-color" class="input-label" hidden
                >색상</label
              >
              <input
                type="text"
                id="${SELECTOR_ID.SUBWAY_LINE_COLOR_INDICATOR}"
                name="subway-line-color"
                class="input-field"
                placeholder="색상을 아래에서 선택해주세요."
                disabled
                required
              />
            </div>
          </div>
          <div class="${SELECTOR_CLASS.SUBWAY_LINE_COLOR_PICKER} px-2"></div>
          <div class="d-flex justify-end mt-3">
            <button
              type="submit"
              name="submit"
              id="${SELECTOR_ID.SUBWAY_LINE_SUBMIT}"
              class="input-submit bg-cyan-300"
            >
              확인
            </button>
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
