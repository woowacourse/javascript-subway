import { SELECTOR_ID, SELECTOR_CLASS, STATE_KEY } from '../constants.js';
import Observer from '../lib/Observer.js';
import { $, getStyleValue, attr } from '../utils/dom.js';

export default class Subway extends Observer {
  #state;
  #targetSelector;
  #parentSelector;

  constructor(state, targetSelector = `#${SELECTOR_ID.SUBWAY_MAP_CONTAINER}`, parentSelector = `#${SELECTOR_ID.MAIN_CONTAINER}`) {
    super();
    this.#state = state;
    this.#targetSelector = targetSelector;
    this.#parentSelector = parentSelector;
  }

  update() {
    this.renderComponent();
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
    attr(colorElement, { "class": line.color });
    $(this.#targetSelector).appendChild(colorElement);
    const currentLineColor = getStyleValue(colorElement, "background-color");

    const lineContainer = document.createElement("ul");
    attr(lineContainer, { "class": SELECTOR_CLASS.SUBWAY_MAP_LINE });
    
    const lineName = document.createElement("li");
    attr(lineName, { 
      "data-marker": "lineName",
      "data-line-id": line.id,
      "style": `border: 4px solid ${currentLineColor};background-color: ${currentLineColor};color: white;`,
   });
    lineName.textContent = line.name;
    lineContainer.appendChild(lineName);
    
    line.stations.forEach((targetStation) => {
      const station = document.createElement("li");
      attr(station, { 
        "class": "subway-map-stations", 
        "data-station-id": targetStation.id 
      });
  
      const stationLine = document.createElement("span");
      attr(stationLine, { 
        "data-marker": "station-line", 
        "style": `background-color: ${currentLineColor};`, 
      });
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
      attr(stationMarker, {
        "data-marker": "station", 
        "style": includedLines.length > 0 
          ? `border: 3px solid black;background-color: white;`
          : `border: 2px solid ${currentLineColor};background-color: white;`
      });
      station.appendChild(stationMarker);
      
      const stationName = document.createElement("span");
      attr(stationName, {
        "data-marker": "station-name", 
        "style": includedLines.length > 0 ? `font-weight: bold;` : ''
      });
      stationName.textContent = targetStation.name;

      const lines = document.createElement("div");
      includedLines.forEach(line => {
        const colorLineElement = document.createElement("div");
        attr(colorLineElement, { "class": line.color });
        $(this.#targetSelector).appendChild(colorLineElement);
        const currentLineElementColor = getStyleValue(colorLineElement, "background-color");

        const lineElement = document.createElement("span");
        attr(lineElement, { 
          "data-marker": "station-included-line", 
          "style": `background-color: ${currentLineElementColor};color: white;margin-left: 2px;`,
        });
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
