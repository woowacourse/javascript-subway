import Station from './Station.js';
import Section from './Section.js';

export default class Line {
  constructor({ id, name, color, stations, sections, createdDate, modifiedDate }) {
    this._id = id;
    this._name = name;
    this._color = color;
    this._stations = stations.map((station) => new Station(station));
    this._sections = sections.map((section) => new Section(section));
    this._createdDate = createdDate;
    this._modifiedDate = modifiedDate;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  set name(name) {
    this._name = name;
  }

  get color() {
    return this._color;
  }

  set color(color) {
    this._color = color;
  }

  get modifiedDate() {
    return this._modifiedDate;
  }

  set modifiedDate(date) {
    this._modifiedDate = date;
  }

  get stations() {
    return this._stations;
  }

  get sections() {
    return this._sections;
  }

  toListItemTemplate() {
    return `
      <li data-line-id="${this._id}" data-line-name="${this._name}" class="line-list-item d-flex items-center py-3 relative">
        <span class="subway-line-color-dot ${this._color}"></span>
        <span class="w-100 pl-6 subway-line-list-item-name"
          >${this._name}</span
        >
        <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm mr-1"
          data-action="edit"
        >
          수정
        </button>
        <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm"
          data-action="delete"
        >
          삭제
        </button>
      </li>
      <hr class="my-0" />
  `;
  }
}
