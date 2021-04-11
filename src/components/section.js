import { FILE_PATH, PAGE_TITLE, SELECTOR_ID, SELECTOR_CLASS, SETTINGS, STATE_KEY } from '../constants.js';
import { delegateSectionClickEvent } from '../delegators/section.js';
import Observer from '../lib/Observer.js';
import { $, setHeadTagAttribute } from '../utils/dom.js';

export default class Section extends Observer {
  #lineListSelector = `#${SELECTOR_ID.SECTION_LINE}`;
  #stationListSelector = `#${SELECTOR_ID.SECTION_STATION_LIST}`;
  #parentSelector;
  #state;

  constructor(state, parentSelector = `#${SELECTOR_ID.MAIN_CONTAINER}`) {
    super();
    this.#state = state;
    this.#parentSelector = parentSelector;
  }

  renderPage() {
    setHeadTagAttribute(PAGE_TITLE.SECTIONS, FILE_PATH.SECTIONS_CSS);
    $(this.#parentSelector).innerHTML = this.#getWrapperTemplate();
  }

  renderComponent() {
    const $lineListContainer = $(this.#lineListSelector);
    const $stationListContainer = $(this.#stationListSelector);
    if (!$lineListContainer || !$stationListContainer) return;

    const targetSectionLineId = this.#state.get(STATE_KEY.TARGET_SECTION_LINE_ID);
    const lineList = this.#state.get(STATE_KEY.LINE_LIST);
    const initialTargetLine = lineList.find(line => line.id === targetSectionLineId);
    const [targetLine] = initialTargetLine ? [initialTargetLine] : lineList;
    $lineListContainer.innerHTML = this.#getLineSelectTemplate(lineList, targetLine);
    $stationListContainer.innerHTML = targetLine.stations.map(station => this.#getStationTemplate(station)).join('');
  }

  initEvents() {
    const $parent = $(this.#parentSelector);
    const $lineSelect = $(`#${SELECTOR_ID.SECTION_LINE_SELECT}`);
    $parent && $parent.addEventListener('click', delegateSectionClickEvent);
    $lineSelect &&
      $lineSelect.addEventListener('change', () => {
        this.#state.update(STATE_KEY.TARGET_SECTION_LINE_ID, Number($lineSelect.value));
      });
  }

  #getWrapperTemplate() {
    return `
      <div class="wrapper bg-white p-10 fade-in">
        <div class="heading d-flex">
          <h2 class="mt-1 w-100">🔁 구간 관리</h2>
          <button
            type="button"
            id="${SELECTOR_ID.SECTION_MODAL_OPEN}"
            class="create-section-btn modal-trigger-btn bg-cyan-300 ml-2"
          >
            구간 추가
          </button>
        </div>
        <form id="${SELECTOR_ID.SECTION_LINE}" class="d-flex items-center pl-1"></form>
        <ul id="${SELECTOR_ID.SECTION_STATION_LIST}" class="mt-3 pl-0"></ul>
      </div>
    `;
  }

  #getLineSelectTemplate(lineList, targetLine) {
    return `
      <label for="${SELECTOR_ID.SECTION_LINE_SELECT}" class="input-label" hidden>노선</label>
      ${
        targetLine
          ? `<select id="${SELECTOR_ID.SECTION_LINE_SELECT}" class="${targetLine.color}">
          ${lineList
            .map(line => {
              const isSelected = line.id === targetLine.id;
              return this.#getLineOptionsTemplate(line, isSelected);
            })
            .join('')}
        </select>`
          : `<select id="${SELECTOR_ID.SECTION_LINE_SELECT}" disabled>
          <option>현재 생성된 노선이 없습니다</option>
        </select>`
      }
      
    `;
  }

  #getLineOptionsTemplate(line, isSelected) {
    return `
      <option value="${line.id}" ${isSelected ? 'selected="selected"' : ''}>${line.name}</option>
    `;
  }

  #getStationTemplate(station) {
    return `
      <li class="${SELECTOR_CLASS.SECTION_ITEM} d-flex items-center py-2 relative">
        <span class="w-100 pl-6">${station.name}</span>
        <button
          type="button"
          class="${SELECTOR_CLASS.SECTION_DELETE_BUTTON} bg-gray-50 text-gray-500 text-sm"
          data-station-id="${station.id}"
        >
          삭제
        </button>
      </li>
      <hr class="my-0" />
    `;
  }
}
