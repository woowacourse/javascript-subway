export default class Station {
  constructor({ id, name, createdDate, modifiedDate }) {
    this._id = id;
    this._name = name;
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

  get modifiedDate() {
    return this._modifiedDate;
  }

  set modifiedDate(date) {
    this._modifiedDate = date;
  }

  toListItemTemplate() {
    return `
      <li data-station-id="${this._id}" data-station-name="${this._name}" class="station-list-item d-flex items-center py-2">
        <span class="station-item-name w-100 pl-2">${this._name}</span>
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
