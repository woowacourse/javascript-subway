import { SELECTOR_ID, SELECTOR_CLASS, STATE_KEY } from "../constants";
import { delegateSectionModalClickEvent, delegateSectionModalSubmitEvent } from '../delegators/sectionModal.js';
import Observer from "../lib/Observer";
import { $ } from '../utils/dom.js';

export default class SectionModal extends Observer {
  #targetSelector;
  #parentSelector;
  #state;

  constructor(state, targetSelector = `#${SELECTOR_ID.SECTION_FORM}`, parentSelector = `.${SELECTOR_CLASS.MODAL}`) {
    super();
    this.#state = state;
    this.#targetSelector = targetSelector;
    this.#parentSelector = parentSelector;
  }

  renderPage() {}

  renderComponent() {
    const modal = $(this.#parentSelector);
    if (!modal) return;
    const targetSectionLineId = this.#state.get(STATE_KEY.TARGET_SECTION_LINE_ID);
    modal.innerHTML = this.#getModalTemplate(targetSectionLineId);
    this.#initEvents();
  }

  #initEvents() {
    $(this.#parentSelector).addEventListener('click', delegateSectionModalClickEvent);
    $(this.#targetSelector).addEventListener('submit', delegateSectionModalSubmitEvent);
  }

  #getModalTemplate(targetSectionLineId) {
    return `
      <div class="${SELECTOR_CLASS.MODAL_INNER} wrapper p-8">
        <button class="${SELECTOR_CLASS.LINE_LIST_MODAL_CLOSE} modal-close">
          <svg viewbox="0 0 40 40">
            <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
          </svg>
        </button>
        <header>
          <h2 class="text-center">🔁 구간 추가</h2>
        </header>
        <form id="${SELECTOR_ID.SECTION_FORM}">
          <div class="input-control">
            <select id="${SELECTOR_ID.SECTION_MODAL_LINE_SELECT}" required>
              ${this.#state.get(STATE_KEY.LINE_LIST).map(lineItem => `<option value="${lineItem.id}" ${lineItem.id === targetSectionLineId ? 'selected' : ''}>${lineItem.name}</option>`).join('')}
            </select>
          </div>
          <div class="d-flex items-center input-control">
            <select id="${SELECTOR_ID.SECTION_MODAL_UP_STATION_SELECT}" required>
              <option value="" selected disabled hidden>이전역</option>
              ${this.#state.get(STATE_KEY.STATION_LIST).map(stationItem => `<option value="${stationItem.id}">${stationItem.name}</option>`).join('')}
            </select>
            <div class="d-inline-block mx-3 text-2xl">➡️</div>
            <select id="${SELECTOR_ID.SECTION_MODAL_DOWN_STATION_SELECT}" required>
              <option value="" selected disabled hidden>다음역</option>
              ${this.#state.get(STATE_KEY.STATION_LIST).map(stationItem => `<option value="${stationItem.id}">${stationItem.name}</option>`).join('')}
            </select>
          </div>
          <div class="d-flex items-center input-control">
            <input type="number" id="${SELECTOR_ID.SECTION_MODAL_DISTANCE_INPUT}" class="input-field d-inline-block text-base" placeholder="상행 하행역 거리(km)" required />
            <div class="d-inline-block mx-3 text-2xl"></div>
            <input type="number" id="${SELECTOR_ID.SECTION_MODAL_DURATION_INPUT}" class="input-field d-inline-block text-base" placeholder="상행 하행역 시간(분)" required />
          </div>
          <div class="d-flex justify-end mt-3">
            <button id="${SELECTOR_ID.SECTION_MODAL_SUBMIT}" type="submit" name="submit" class="input-submit bg-cyan-300">확인</button>
          </div>
        </form>
      </div>  
    `;
  }
}