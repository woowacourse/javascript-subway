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

  toSectionItemTemplate(colorCode) {
    return `
      <li data-station-id="${this._id}" data-station-name="${this._name}" class="station-list-item d-flex items-center py-3 px-5">
        <span class="vertical-line bg-${colorCode}"></span>
        <span class="subway-line-color-dot bg-${colorCode}"></span>
        <span class="station-item-name w-100 pl-6">${this._name}</span>
        <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm"
          data-action="delete"
        >
          삭제
        </button>
      </li>
      <div class="section-data-container d-flex justify-center">
        <div class="chip distance-chip mr-2 border-color-${colorCode} border-solid border-2">거리:&nbsp<span class="distance-value"></span>km</div>
        <div class="chip duration-chip ml-2 border-color-${colorCode} border-solid border-2">시간:&nbsp<span class="duration-value"></span>분</div>
      </div>
      <hr class="my-0 mx-6" />
      `;
  }
}
