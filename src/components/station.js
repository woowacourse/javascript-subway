import { FILE_PATH, PAGE_TITLE, SELECTOR_CLASS, SELECTOR_ID, STATE_KEY, STYLE_CLASS } from '../constants';
import Observer from '../lib/Observer';
import { $, setHeadTagAttribute } from '../utils/dom.js';
import { delegateStationClickEvent, delegateStationFocusOutEvent, delegateStationSubmitEvent } from '../delegators/station.js';

export default class Station extends Observer {
  #targetSelector;
  #parentSelector;
  #state;

  constructor(
    state,
    targetSelector = `#${SELECTOR_ID.STATION_LIST}`,
    parentSelector = `#${SELECTOR_ID.MAIN_CONTAINER}`
  ) {
    super();
    this.#targetSelector = targetSelector;
    this.#parentSelector = parentSelector;
    this.#state = state;
  }

  renderPage() {
    $(this.#parentSelector).innerHTML = this.#getWrapperTemplate();
  }

  renderComponent() {
    const targetContainer = $(this.#targetSelector);
    if (!targetContainer) return;
    targetContainer.innerHTML = '';
    this.#state.get(STATE_KEY.STATION_LIST).forEach(station => this.#createStation(station));
    this.#initEvents();
  }

  #initEvents() {
    $(this.#parentSelector).addEventListener('submit', delegateStationSubmitEvent);
    $(this.#parentSelector).addEventListener('focusout', delegateStationFocusOutEvent);
    $(this.#parentSelector).addEventListener('click', delegateStationClickEvent);
  }

  #getWrapperTemplate() {
    return `
      <div data-test-id="stations" class="wrapper bg-white p-10 fade-in">
        <div class="heading"><h2 class="mt-1">🚉 역 관리</h2></div>
        <form id="${SELECTOR_ID.STATION_FORM}">
          <div class="d-flex w-100">
            <label for="${SELECTOR_ID.STATION_NAME_INPUT}" class="input-label" hidden> 역 이름 </label
            ><input
              type="text"
              id="${SELECTOR_ID.STATION_NAME_INPUT}"
              name="stationName"
              class="input-field"
              placeholder="역 이름"
              required
            /><button type="submit" name="submit" id="${SELECTOR_ID.STATION_LIST_ITEM_REGISTER}" class="input-submit bg-cyan-300 ml-2">확인</button>
          </div>
        </form>
        <ul id="${SELECTOR_ID.STATION_LIST}" class="mt-3 pl-0"></ul>
      </div>
    `;
  }

  #createStation(station) {
    const stationItem = document.createElement("li");
    stationItem.setAttribute("data-station-id", station.id);
    stationItem.setAttribute("class", `${SELECTOR_CLASS.STATION_LIST_ITEM} d-flex items-center py-2`);

    const stationName = document.createElement("span");
    stationName.setAttribute("class", `${SELECTOR_CLASS.STATION_LIST_ITEM_NAME} w-100 pl-2`);
    stationName.textContent = station.name;
    stationItem.appendChild(stationName);    

    const lineList = this.#state.get(STATE_KEY.LINE_LIST);
    const includedLines = document.createElement("span");
    lineList.forEach(line => {
      includedLines.setAttribute("class", SELECTOR_CLASS.STATION_LIST_INCLUDED_LINES);
      if (line.stations.find(currentStation => currentStation.id === station.id)) {
        const tempColorElement = document.createElement("div");
        tempColorElement.setAttribute("class", line.color);
        $(this.#targetSelector).appendChild(tempColorElement);
        const lineColor = window.getComputedStyle(tempColorElement).getPropertyValue("background-color");

        const includedLine = document.createElement("span");
        includedLine.setAttribute("class", SELECTOR_CLASS.STATION_LIST_INCLUDED_LINE);
        includedLine.setAttribute("style", `background-color: ${lineColor};`);
        includedLine.textContent = line.name;

        tempColorElement.remove();
        includedLines.appendChild(includedLine);
      }
    });
    stationName.appendChild(includedLines);

    const stationUpdateButton = document.createElement("button");
    stationUpdateButton.setAttribute("type", "button");
    stationUpdateButton.setAttribute("class", `${SELECTOR_CLASS.STATION_LIST_ITEM_UPDATE} bg-gray-50 text-gray-500 text-sm mr-1`);
    stationUpdateButton.setAttribute("data-station-id", station.id);
    stationUpdateButton.setAttribute("data-station-name", station.name);
    stationUpdateButton.textContent = "수정";
    stationItem.appendChild(stationUpdateButton);

    const stationDeleteButton = document.createElement("button");
    stationDeleteButton.setAttribute("type", "button");
    stationDeleteButton.setAttribute("class", `${SELECTOR_CLASS.STATION_LIST_ITEM_DELETE} bg-gray-50 text-gray-500 text-sm`);
    stationDeleteButton.setAttribute("data-station-id", station.id);
    stationDeleteButton.setAttribute("data-station-name", station.name);
    stationDeleteButton.textContent = "삭제";
    stationItem.appendChild(stationDeleteButton);

    const stationUpdateInput = document.createElement("input");
    stationUpdateInput.setAttribute("data-station-id", station.id);
    stationUpdateInput.setAttribute("class", `${STYLE_CLASS.REMOVED} ${SELECTOR_CLASS.STATION_LIST_ITEM_INPUT}`);
    stationUpdateInput.setAttribute("type", "text");
    stationUpdateInput.setAttribute("required", "required");
    stationItem.appendChild(stationUpdateInput);

    $(this.#targetSelector).appendChild(stationItem);
    const horizontalLine = document.createElement("hr");
    horizontalLine.setAttribute("class", "my-0");
    $(this.#targetSelector).appendChild(horizontalLine);
  }
}
