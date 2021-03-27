import { SELECTOR_ID, SELECTOR_CLASS, STATE_KEY } from "../constants";
import { delegateSectionModalClickEvent } from '../delegators/sectionModal.js';
import Observer from "../lib/Observer";
import { $ } from '../utils/dom.js';

export default class SectionModal extends Observer {
  #targetSelector;
  #parentSelector;
  #state;

  constructor(state, targetSelector = `#${SELECTOR_ID.SUBWAY_SECTION_FORM}`, parentSelector = `.${SELECTOR_CLASS.MODAL}`) {
    super();
    this.#state = state;
    this.#targetSelector = targetSelector;
    this.#parentSelector = parentSelector;
  }

  renderPage() {}

  renderComponent() {
    const modal = $(this.#parentSelector);
    if (!modal) return;
    modal.innerHTML = this.#getModalTemplate();
    this.#initEvents();
  }

  #initEvents() {
    $(this.#parentSelector).addEventListener('click', delegateSectionModalClickEvent);
  }

  #getModalTemplate() {
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
        <form id="${SELECTOR_ID.SUBWAY_SECTION_FORM}">
          <div class="input-control">
            <select>
              ${this.#state.get(STATE_KEY.LINE_LIST).map(lineItem => `<option>${lineItem.name}</option>`).join('')}
            </select>
          </div>
          <div class="d-flex items-center input-control">
            <select>
              <option value="" selected disabled hidden>이전역</option>
              ${this.#state.get(STATE_KEY.STATION_LIST).map(stationItem => `<option>${stationItem.name}</option>`).join('')}
              </select>
              <div class="d-inline-block mx-3 text-2xl">➡️</div>
              <select>
              <option value="" selected disabled hidden>다음역</option>
              ${this.#state.get(STATE_KEY.STATION_LIST).map(stationItem => `<option>${stationItem.name}</option>`).join('')}
            </select>
          </div>
          <div class="d-flex justify-end mt-3">
            <button type="submit" name="submit" class="input-submit bg-cyan-300">확인</button>
          </div>
        </form>
      </div>  
    `;
  }
}