import { FILE_PATH, PAGE_TITLE, SELECTOR_ID, SELECTOR_CLASS, SETTINGS, STATE_KEY } from '../constants.js';
import { delegateSectionClickEvent } from '../delegators/section.js';
import Observer from '../lib/Observer.js';
import { $, setHeadTagAttribute } from '../utils/dom.js';

export default class Section extends Observer {
  #lineListSelector;
  #stationListSelector;
  #parentSelector;
  #state;
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

  renderPage() {
    setHeadTagAttribute(PAGE_TITLE.SECTIONS, FILE_PATH.SECTIONS_CSS);
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
    tempColorElement.setAttribute("class", this.#targetLine.color);
    $(this.#stationListSelector).appendChild(tempColorElement);
    const targetLineColor = window.getComputedStyle(tempColorElement).getPropertyValue('background-color');

    const stationItem = document.createElement("li");
    stationItem.setAttribute("class", "d-flex items-center py-2 relative");
    
    const stationName = document.createElement("span");
    stationName.setAttribute("class", `w-100 pl-6`);
    stationName.textContent = station.name;
    stationItem.appendChild(stationName);
    
    if (index < this.#targetLine.sections.length) {
      const sectionContainer = document.createElement("div");
      sectionContainer.setAttribute("class", SELECTOR_CLASS.SECTION_CONTAINER);
      const targetSection = this.#targetLine.sections[index];

      const sectionDistance = document.createElement("span");
      sectionDistance.setAttribute("class", SELECTOR_CLASS.SECTION_DISTANCE);
      sectionDistance.setAttribute("style", `border: 2px solid ${targetLineColor};`);
      sectionDistance.textContent = `${targetSection.distance}km`;
      
      const sectionDuration = document.createElement("span");
      sectionDuration.setAttribute("class", SELECTOR_CLASS.SECTION_DURATION);
      sectionDuration.setAttribute("style", `border: 2px solid ${targetLineColor};`);
      sectionDuration.textContent = `${targetSection.duration}분`;

      const upStationPoint = document.createElement("span");
      upStationPoint.setAttribute("class", SELECTOR_CLASS.UP_STATION_POINT);
      upStationPoint.setAttribute("style", `border: 2px solid ${targetLineColor};`);
      const stationConnection = document.createElement("span");
      stationConnection.setAttribute("class", SELECTOR_CLASS.STATION_CONNECTION);
      stationConnection.setAttribute("style", `background-color: ${targetLineColor};`);
      const downStationPoint = document.createElement("span");
      downStationPoint.setAttribute("class", SELECTOR_CLASS.DOWN_STATION_POINT);
      downStationPoint.setAttribute("style", `border: 2px solid ${targetLineColor};`);

      sectionContainer.appendChild(upStationPoint);
      sectionContainer.appendChild(stationConnection);
      sectionContainer.appendChild(downStationPoint);
      sectionContainer.appendChild(sectionDistance);
      sectionContainer.appendChild(sectionDuration);
      stationItem.appendChild(sectionContainer);
    }

    const horizontalLine = document.createElement("hr");
    horizontalLine.setAttribute("class", "my-0");

    const stationDeleteButton = document.createElement("button");
    stationDeleteButton.setAttribute("type", "button");
    stationDeleteButton.setAttribute("class", `${SELECTOR_CLASS.SECTION_DELETE_BUTTON} bg-gray-50 text-gray-500 text-sm`);
    stationDeleteButton.setAttribute("data-station-id", station.id);
    stationDeleteButton.setAttribute("data-station-name", station.name);
    stationDeleteButton.textContent = "삭제";

    stationItem.appendChild(stationDeleteButton);

    $(this.#stationListSelector).appendChild(stationItem);
    $(this.#stationListSelector).appendChild(horizontalLine);
  }
}
