import { SELECTOR } from '../../constants/constants.js';
import { $, hide, show } from '../../utils/dom.js';
import { contentTemplate } from './template.js';

export default class MapPage {
  constructor(store) {
    this.store = store;
    this.$content = $(SELECTOR.CONTENT);
  }

  init() {
    this.render();
    this.selectDOM();
    this.bindEvents();
  }

  render() {
    this.$content.innerHTML = contentTemplate;
    $('#line-select').append(...this.store.lines.map((line) => new Option(line.name, line.id)));
    $('#station-select').append(...this.store.stations.map((station) => new Option(station.name, station.id)));

    $(SELECTOR.LINE_LIST).innerHTML = this.store.lines
      .map(
        (line) =>
          `<li class="line-list-item" data-line-id=${line.id}>
            <h3 class="subway-line-name mb-0 ${line.color} text-base text-white font-semibold">${line.name}</h3>
            <ul class="station-list mt-0 px-4" data-line-id=${line.id} data-line-name="${line.name}" data-line-color="${line.color}">
            </ul>
          </li>`
      )
      .join('');

    $('.station-list').forEach(($line) => {
      $line.innerHTML = this.store.lines
        .find((line) => line.id === Number($line.dataset.lineId))
        .stations.map(
          (station) => `
            <li data-station-id="${station.id}" data-station-name="${station.name}" class="station-list-item d-flex items-center py-3">
              <san class="vertical-line ${$line.dataset.lineColor}"></san>
              <span class="subway-line-color-dot ${$line.dataset.lineColor}"></span>
              <span class="station-item-name w-100 pl-6">${station.name}</span>
            </li>
            `
        )
        .join('');
    });
  }

  selectDOM() {
    this.$lineSelect = $(SELECTOR.LINE_SELECT);
    this.$stationSelect = $(SELECTOR.STATION_SELECT);
    this.$lineListItem = $(SELECTOR.LINE_LIST_ITEM);
  }

  bindEvents() {
    this.$lineSelect.addEventListener('change', this.renderByLine.bind(this));
    this.$stationSelect.addEventListener('change', this.renderByStation.bind(this));
  }

  handleLineSelect(event) {
    this.lineID = event.target.value;

    this.renderLineData();
  }

  renderLineData() {
    const targetLine = this.store.lines.find((line) => line.id === Number(this.lineID));
    const prevLineBorderColor = [...this.$lineSelect.classList].find((className) =>
      className.startsWith('border-color-')
    );

    const extractedColor = targetLine ? targetLine.color.replace(/bg-/, '') : 'gray-100';
    this.$lineSelect.classList.remove(prevLineBorderColor);
    this.$lineSelect.classList.add(`border-color-${extractedColor}`);
  }

  renderByLine(event) {
    const targetLineId = event.target.value;

    if (!targetLineId) {
      this.showAllLineList();
      event.target.classList.remove('selected');
      return;
    }

    event.target.classList.add('selected');
    this.$stationSelect.selectedIndex = 0;
    this.$stationSelect.classList.remove('selected');

    this.$lineListItem.forEach(($line) => {
      if (targetLineId === $line.dataset.lineId) {
        show($line);
      } else {
        hide($line);
      }
    });
  }

  renderByStation(event) {
    const stationId = event.target.value;

    if (!stationId) {
      this.showAllLineList();
      event.target.classList.remove('selected');
      return;
    }

    event.target.classList.add('selected');
    this.$lineSelect.selectedIndex = 0;
    this.$lineSelect.classList.remove('selected');

    const targetLines = this.store.lines.filter((line) =>
      line.stations.find((station) => station.id === Number(stationId))
    );

    if (!targetLines.length) {
      this.hideAllLineList();
      show($('#no-line-warning'));
      return;
    }
    hide($('#no-line-warning'));

    const targetLinesId = targetLines.map((line) => line.id);

    this.$lineListItem.forEach(($line) => {
      if (targetLinesId.includes(Number($line.dataset.lineId))) {
        show($line);
      } else {
        hide($line);
      }
    });
  }

  showAllLineList() {
    this.$lineListItem.forEach(($line) => show($line));
  }

  hideAllLineList() {
    this.$lineListItem.forEach(($line) => hide($line));
  }
}
