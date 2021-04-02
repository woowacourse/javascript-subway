import { SELECTOR_ID, STATE_KEY, PAGE_TITLE, FILE_PATH } from '../constants.js';
import Observer from '../lib/Observer.js';
import { $, setHeadTagAttribute } from '../utils/dom.js';

export default class Subway extends Observer {
  #targetSelector;
  #parentSelector;
  #state;

  constructor(state, targetSelector = `#${SELECTOR_ID.SUBWAY_MAP}`, parentSelector = `#${SELECTOR_ID.MAIN_CONTAINER}`) {
    super();
    this.#targetSelector = targetSelector;
    this.#parentSelector = parentSelector;
    this.#state = state;
  }

  renderPage() {
    setHeadTagAttribute(PAGE_TITLE.SUBWAY, FILE_PATH.SUBWAY_MAP_CSS);
    $(this.#parentSelector).innerHTML = this.#getWrapperTemplate();
  }

  renderComponent() {
    const targetContainer = $(this.#targetSelector);
    if (!targetContainer) return;
    const lineList = this.#state.get(STATE_KEY.LINE_LIST);
    const processedLineList = this.#getProcessedLineList(lineList);
    targetContainer.innerHTML = this.#getSubwayMapTemplate(processedLineList);
  }

  #getProcessedLineList(lineList) {
    return lineList.map(line => ({
      id: line.id,
      name: line.name,
      duration: line.duration,
      color: line.color,
      stations: this.#getProcessedStationList(line)
    }));
  }

  #getProcessedStationList(line) {
    return line.stations.map(station => ({
      id: station.id,
      name: station.name,
      duration: this.#getSectionDuration(station.name, line.sections),
      linkedLines: this.#getLinkedLines(station.id, line.id)
    }))
  }

  #getSectionDuration(stationName, sections) {
    const targetSection = sections.find(section => section.upStation.name === stationName);
    return targetSection ? targetSection.duration : undefined
  }

  #getLinkedLines(stationId, lineId) {
    const lineList = this.#state.get(STATE_KEY.LINE_LIST);
    return lineList
      .filter(line => line.stations.some(station => station.id === stationId) && line.id !== lineId)
      .map(line => ({id: line.id, name: line.name, color: line.color}))
  }

  #getWrapperTemplate() {
    return `
      <div id="${SELECTOR_ID.SUBWAY_MAP}" class="d-flex"></div>
    `;
  }

  #getSubwayMapTemplate(lineList) {
    return lineList.map(line => this.#getLineTemplate(line)).join("")
  }

  #getLineTemplate(line) {
    return `
      <div class="line mr-9 shadow-md" dir="rtl">
        <h1 class="line__name ${line.color}">${line.name}</h1>
        <hr class="mt-4 mb-10" />
        <div class="line__station-list">
          ${line.stations.map(station => this.#getStationTemplate(station, line.name)).join("")}
        </div>
      </div>
    `;
  }

  #getStationTemplate(station, lineName) {
    return `
      <div class="station d-flex mt-2 pl-2 justify-end">
      <a name="${lineName}-${station.name}"></a>
        <div class="d-flex flex-col px-2 items-end">
          <span class="station__name">${station.name}</span>
          <ul class="station__linked-lines list-style-none p-0 ">
            ${this.#getLinkedLinesTemplate(station.name, station.linkedLines)}
          </ul>
          <span class="station__duration">${station.duration ? `${station.duration}분` : ''}</span>
        </div>
        <div class="d-flex flex-col items-center mr-1">
          <div class="station__circle"></div>
          <div class="station__bar station__bar--${this.#getStationBarType(station.duration)}"></div>
        </div>
      </div>
    `
  }

  #getStationBarType(duration) {
    if (!duration || duration === 0) {
      return 'none'
    }
    if (duration < 3) {
      return 'short'
    }
    if (duration < 5) {
      return 'medium'
    }
    if (duration < 10) {
      return 'long'
    } else {
      return 'extra-long'
    }
  }

  #getLinkedLinesTemplate(stationName, linkedLines) {
    return linkedLines
      .map(linkedLine => `<a class="linked-line" href="#${linkedLine.name}-${stationName}"><li class="station__linked-line-text font-${linkedLine.color.substr(3)}">${linkedLine.name}</li></a>`)
      .join("")
  }
}
