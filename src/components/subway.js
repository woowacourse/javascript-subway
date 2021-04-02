import { SELECTOR_ID, SELECTOR_CLASS, STATE_KEY } from '../constants.js';
import Observer from '../lib/Observer.js';
import { $ } from '../utils/dom.js';

export default class Subway extends Observer {
  #targetSelector;
  #parentSelector;
  #state;

  constructor(state, targetSelector = `#${SELECTOR_ID.SUBWAY_MAP_CONTAINER}`, parentSelector = `#${SELECTOR_ID.MAIN_CONTAINER}`) {
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
    const lineList = this.#state.get(STATE_KEY.LINE_LIST);
    lineList.forEach(line => targetContainer.appendChild(this.#createSections(line)));
  }

  #getWrapperTemplate() {
    return `
      <div id="${SELECTOR_ID.SUBWAY_MAP_WRAPPER}" class="wrapper bg-white p-10 fade-in">
        <div class="heading d-flex">
          <h2 class="mt-1 w-100">🗺️ 전체 보기</h2>
        </div>
        <div id="${SELECTOR_ID.SUBWAY_MAP_CONTAINER}"></div>
      </div>
    `;
  }

  #createSections(line) {
    const colorElement = document.createElement("div");
    colorElement.setAttribute("class", line.color);
    $(this.#targetSelector).appendChild(colorElement);
    const currentLineColor = window.getComputedStyle(colorElement).getPropertyValue("background-color");

    const lineContainer = document.createElement("ul");
    lineContainer.setAttribute("class", SELECTOR_CLASS.SUBWAY_MAP_LINE);
    
    const lineName = document.createElement("li");
    lineName.setAttribute("data-marker", "lineName");
    lineName.setAttribute("data-line-id", line.id);
    lineName.setAttribute("style", `border: 4px solid ${currentLineColor};background-color: ${currentLineColor};color: white;`);
    lineName.textContent = line.name;
    lineContainer.appendChild(lineName);
    
    line.stations.forEach((targetStation) => {
      const station = document.createElement("li");
      station.setAttribute("class", "subway-map-stations");
      station.setAttribute("data-station-id", targetStation.id);
  
      const stationLine = document.createElement("span");
      stationLine.setAttribute("data-marker", "station-line");
      stationLine.setAttribute("style", `background-color: ${currentLineColor};`);
      station.appendChild(stationLine);
      
      const lineList = this.#state.get(STATE_KEY.LINE_LIST);
      const filteredLineList = lineList.filter(currentLine => currentLine.id !== line.id);
      const includedLines = [];
      filteredLineList.forEach(currentLine => {
        if (currentLine.stations.find(station => station.id === targetStation.id)) {
          includedLines.push(currentLine);
        }
      });
      
      const stationMarker = document.createElement("span");
      stationMarker.setAttribute("data-marker", "station");
      stationMarker.setAttribute("style", 
        includedLines.length > 0 
        ? `border: 3px solid black;background-color: white;`
        : `border: 2px solid ${currentLineColor};background-color: white;`
      );
      station.appendChild(stationMarker);
      
      const stationName = document.createElement("span");
      stationName.setAttribute("data-marker", "station-name");
      stationName.setAttribute("style", includedLines.length > 0 ? `font-weight: bold;` : '');
      stationName.textContent = targetStation.name;

      const lines = document.createElement("div");
      includedLines.forEach(line => {
        const colorLineElement = document.createElement("div");
        colorLineElement.setAttribute("class", line.color);
        $(this.#targetSelector).appendChild(colorLineElement);
        const currentLineElementColor = window.getComputedStyle(colorLineElement).getPropertyValue("background-color");

        const lineElement = document.createElement("span");
        lineElement.setAttribute("data-marker", "station-included-line");
        lineElement.setAttribute("style", `background-color: ${currentLineElementColor};color: white;margin-left: 2px;`);
        lineElement.textContent = line.name;
        lines.appendChild(lineElement);

        colorLineElement.remove();
      });

      stationName.appendChild(lines);
      station.appendChild(stationName);
      
      lineContainer.appendChild(station);
    });
    
    colorElement.remove();

    return lineContainer;
  }
}
