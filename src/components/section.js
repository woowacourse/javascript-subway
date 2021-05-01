import { SELECTOR_ID, SELECTOR_CLASS, SETTINGS, STATE_KEY } from '../constants.js';
import { delegateSectionClickEvent } from '../delegators/section.js';
import Observer from '../lib/Observer.js';
import { $, getStyleValue, attr } from '../utils/dom.js';

export default class Section extends Observer {
  #state;
  #lineListSelector;
  #stationListSelector;
  #parentSelector;
  #targetLine;

  constructor(
    state,
    lineListSelector = `#${SELECTOR_ID.SECTION_LINE}`,
    stationListSelector = `#${SELECTOR_ID.SECTION_STATION_LIST}`,
    parentSelector = `#${SELECTOR_ID.MAIN_CONTAINER}`
  ) {
    super();
    this.#state = state;
    this.#lineListSelector = lineListSelector;
    this.#stationListSelector = stationListSelector;
    this.#parentSelector = parentSelector;
    this.#targetLine = null;
  }

  update() {
    this.renderComponent();
  }

  renderPage() {
    $(this.#parentSelector).innerHTML = this.#getWrapperTemplate();
  }

  renderComponent() {
    const lineListContainer = $(this.#lineListSelector);
    const stationListContainer = $(this.#stationListSelector);
    const targetLineId = Number(this.#state.get(STATE_KEY.TARGET_SECTION_LINE_ID));
    if (!lineListContainer || !stationListContainer || targetLineId === SETTINGS.NOT_INITIATED_NUMBER) return;
    
    const lineList = this.#state.get(STATE_KEY.LINE_LIST);
    const targetLine = lineList.find(line => line.id === targetLineId);
    this.#targetLine = targetLine;
    if (!targetLine) return;

    lineListContainer.innerHTML = `
      <label for="${SELECTOR_ID.SECTION_LINE_SELECT}" class="input-label" hidden>노선</label>
      <select id="${SELECTOR_ID.SECTION_LINE_SELECT}" class="${targetLine.color}">
        ${lineList.map(line => {
          const isSelected = line.id === targetLineId;
          return this.#getLineTemplate(line, isSelected);
        }).join("")}
      </select>
    `;

    $(this.#stationListSelector).innerHTML = '';
    targetLine.stations.forEach((station, index) => this.#createStation(station, index));
    this.#initEvents();
  }

  #initEvents() {
    $(this.#parentSelector).addEventListener('click', delegateSectionClickEvent);
    const $lineSelect = $(`#${SELECTOR_ID.SECTION_LINE_SELECT}`);
    $lineSelect.addEventListener('change', () => {
      this.#state.update(STATE_KEY.TARGET_SECTION_LINE_ID, Number($lineSelect.value));
    })
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

  #getLineTemplate(line, isSelected) {
    return `
      <option value="${line.id}" ${isSelected ? 'selected="selected"' : ''}>${line.name}</option>
    `;
  }

  #createStation(station, index) {
    const tempColorElement = document.createElement("div");
    attr(tempColorElement, { "class": this.#targetLine.color });
    $(this.#stationListSelector).appendChild(tempColorElement);
    const targetLineColor = getStyleValue(tempColorElement, "background-color");

    const stationItem = document.createElement("li");
    attr(stationItem, { "class": "d-flex items-center py-2 relative" });
    
    const stationName = document.createElement("span");
    attr(stationName, { "class": `w-100 pl-6` });
    stationName.textContent = station.name;
    stationItem.appendChild(stationName);
    
    if (index < this.#targetLine.sections.length) {
      const sectionContainer = document.createElement("div");
      attr(sectionContainer, { "class": SELECTOR_CLASS.SECTION_CONTAINER });
      const targetSection = this.#targetLine.sections[index];

      const sectionDistance = document.createElement("span");
      attr(sectionDistance, {
        "class": SELECTOR_CLASS.SECTION_DISTANCE,
        "style": `border: 2px solid ${targetLineColor};`,
      });
      sectionDistance.textContent = `${targetSection.distance}km`;
      
      const sectionDuration = document.createElement("span");
      attr(sectionDuration, {
        "class": SELECTOR_CLASS.SECTION_DURATION,
        "style": `border: 2px solid ${targetLineColor};`,
      });
      sectionDuration.textContent = `${targetSection.duration}분`;

      const upStationPoint = document.createElement("span");
      attr(upStationPoint, {
        "class": SELECTOR_CLASS.UP_STATION_POINT,
        "style": `border: 2px solid ${targetLineColor};`,
      });

      const stationConnection = document.createElement("span");
      attr(stationConnection, {
        "class": SELECTOR_CLASS.STATION_CONNECTION,
        "style": `background-color: ${targetLineColor};`,
      });
      
      const downStationPoint = document.createElement("span");
      attr(downStationPoint, {
        "class": SELECTOR_CLASS.DOWN_STATION_POINT,
        "style": `border: 2px solid ${targetLineColor};`,
      });

      sectionContainer.appendChild(upStationPoint);
      sectionContainer.appendChild(stationConnection);
      sectionContainer.appendChild(downStationPoint);
      sectionContainer.appendChild(sectionDistance);
      sectionContainer.appendChild(sectionDuration);
      stationItem.appendChild(sectionContainer);
    }

    const horizontalLine = document.createElement("hr");
    attr(horizontalLine, { "class": "my-0" });

    const stationDeleteButton = document.createElement("button");
    attr(stationDeleteButton, {
      "type": "button",
      "class": `${SELECTOR_CLASS.SECTION_DELETE_BUTTON} bg-gray-50 text-gray-500 text-sm`,
      "data-station-id": station.id,
      "data-station-name": station.name,
    });
    stationDeleteButton.textContent = "삭제";

    stationItem.appendChild(stationDeleteButton);

    $(this.#stationListSelector).appendChild(stationItem);
    $(this.#stationListSelector).appendChild(horizontalLine);
  }
}
