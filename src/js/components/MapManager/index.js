import { $, show, hide } from '../../utils/dom.js';
import { SELECTOR } from '../../constants/constants.js';
import template from './template.js';

export default class MapManager {
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
    this.$content.innerHTML = template;
    this.$subwayMap = $('#subway-map');
    this.renderMap();
  }

  selectDOM() {
    this.transferDot = $(SELECTOR.TRANSFER_DOT);
  }

  bindEvents() {
    this.transferDot.forEach((elem) => {
      elem.addEventListener('mouseover', this.showTransferPopover.bind(this));
      elem.addEventListener('mouseout', this.hideTransferPopover.bind(this));
    });
  }

  renderMap() {
    this.$subwayMap.innerHTML = this.store.lines.map((line) => line.toMapTemplate()).join('');
  }

  checkTransferStations() {
    this.store.lines.forEach((line) => {
      line.stations.forEach((station) => {
        this.store.stations.find((_station) => _station.id === station.id).addBelongingLines(line);
      });
    });

    this.store.lines.forEach((line) => {
      line.stations.forEach((station) => {
        station.belongingLines = this.store.stations.find((_station) => _station.id === station.id).belongingLines;
      });
    });
  }

  showTransferPopover(event) {
    $(`[data-popover-id="${event.target.dataset.stationId}"]`).forEach((popOver) => show(popOver));
  }

  hideTransferPopover(event) {
    $(`[data-popover-id="${event.target.dataset.stationId}"]`).forEach((popOver) => hide(popOver));
  }
}
