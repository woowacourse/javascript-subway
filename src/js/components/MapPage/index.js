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
    this.setOptions();
    this.renderLineList();
    this.renderStationList();
  }

  setOptions() {
    $('#line-select').append(...this.store.lines.map((line) => new Option(line.name, line.id)));
    $('#station-select').append(...this.store.stations.map((station) => new Option(station.name, station.id)));
  }

  renderLineList() {
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
  }

  renderStationList() {
    $('.station-list').forEach(($line) => {
      $line.innerHTML = this.store.lines
        .find((line) => line.id === Number($line.dataset.lineId))
        .stations.map(
          (station) => `
            <li data-station-id="${station.id}" data-station-name="${station.name}" class="station-list-item d-flex items-center py-3 relative">
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
    this.$noLineWarning = $(SELECTOR.NO_LINE_WARNING);
  }

  bindEvents() {
    this.$lineSelect.addEventListener('change', this.renderByLine.bind(this));
    this.$stationSelect.addEventListener('change', this.renderByStation.bind(this));
  }

  renderByLine(event) {
    const targetLineId = event.target.value;
    this.initStationSelect();
    hide(this.$noLineWarning);

    if (targetLineId === 'all') {
      this.showAllLineList();
      event.target.classList.remove('selected');
      return;
    }
    event.target.classList.add('selected');

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
    this.initLineSelect();

    if (stationId === 'all') {
      this.showAllLineList();
      event.target.classList.remove('selected');
      return;
    }
    event.target.classList.add('selected');

    const targetLinesId = this.store.lines
      .filter((line) => line.stations.find((station) => station.id === Number(stationId)))
      .map((line) => line.id);

    if (!targetLinesId.length) {
      this.hideAllLineList();
      show(this.$noLineWarning);

      return;
    }
    hide(this.$noLineWarning);

    this.$lineListItem.forEach(($line) => {
      if (targetLinesId.includes(Number($line.dataset.lineId))) {
        show($line);
      } else {
        hide($line);
      }
    });
  }

  initStationSelect() {
    this.$stationSelect.selectedIndex = 0;
    this.$stationSelect.classList.remove('selected');
  }

  initLineSelect() {
    this.$lineSelect.selectedIndex = 0;
    this.$lineSelect.classList.remove('selected');
  }

  showAllLineList() {
    this.$lineListItem.forEach(($line) => show($line));
  }

  hideAllLineList() {
    this.$lineListItem.forEach(($line) => hide($line));
  }
}
