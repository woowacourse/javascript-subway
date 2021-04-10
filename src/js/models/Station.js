export default class Station {
  constructor({ id, name, createdDate, modifiedDate }) {
    this._id = id;
    this._name = name;
    this._createdDate = createdDate;
    this._modifiedDate = modifiedDate;
    this._belongingLines = [];
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

  set belongingLines(lines) {
    this._belongingLines = lines;
  }

  get belongingLines() {
    return this._belongingLines;
  }

  addBelongingLines(lineId) {
    this._belongingLines.push(lineId);
  }

  isTransferStation() {
    return this._belongingLines.length > 1;
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

  toSectionItemTemplate(lineColor) {
    return `
      <li data-station-id="${this._id}" data-station-name="${this._name}" class="station-list-item d-flex items-center py-2">
        <span class="vertical-line ${lineColor}"></span>
        <span class="subway-line-color-dot ${lineColor}"></span>
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
        <div class="chip distance-chip mr-2">거리:&nbsp<span class="distance-value"></span>km</div>
        <div class="chip duration-chip ml-2">시간:&nbsp<span class="duration-value"></span>분</div>
      </div>
      <hr class="my-0" />
      `;
  }

  toMapItemTemplate(lineColor) {
    return `
      <li class="map-station-list">
        <div class="text-center">${this._name}</div>
        <div class="map-line-connector">
          <span class="horizontal-line ${lineColor}"></span>
          <div class="subway-line-color-dot">
            <div data-station-id="${this._id}" class="transfer-dot ${!this.isTransferStation() && 'd-none'}"></div>
          </div>
        </div>
        <ul data-popover-id="${this._id}" class="transfer-pop-over d-none">
          ${this._belongingLines
            .map(
              (line) => `
                <li>
                  <span class="pop-over-color-dot ${line.color}"></span>
                  <span>&nbsp${line.name}</span>
                </li>
              `
            )
            .join('')}
        </ul>
      </li>
    `;
  }
}
