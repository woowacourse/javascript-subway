import { SELECTOR } from '../../constants/constants.js';
import { $ } from '../../utils/dom.js';
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

    $('#subway-list').innerHTML = this.store.lines
      .map(
        (line) =>
          `<li class="subway-line">
            <h3 class="subway-line-name mb-0 ${line.color} text-base text-white font-medium">${line.name}</h3>
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
            <li data-station-id="${station.id}" data-station-name="${station.name}" class="station-list-item d-flex items-center py-2">
              <span class="vertical-line ${$line.dataset.lineColor}"></span>
              <span class="subway-line-color-dot ${$line.dataset.lineColor}"></span>
              <span class="station-item-name w-100 pl-6">${station.name}</span>
            </li>
            <hr class="my-0" />
            `
        )
        .join('');
    });
  }

  selectDOM() {
    this.$lineSelect = $('#line-select');
  }

  bindEvents() {
    $('#line-select').addEventListener('change', this.handleLineSelect.bind(this));
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
}
