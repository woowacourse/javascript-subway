export const createStationSelectOption = (station) =>
  `<option value="${station.id}">${station.name}</option>`;

export const createStationListItem = (station, displayModifyBtn = true) => {
  return `
      <li
        data-station-id="${station.id}"
        data-station-name="${station.name}"
        class="station-list-item d-flex items-center"
        >
        <span class="js-station-name w-100">${station.name}</span>
        ${
          displayModifyBtn === true
            ? `<button
                type="button"
                class="js-modify-btn bg-gray-50 text-gray-500 text-sm mr-1"
              >
                수정
              </button>`
            : ""
        }
        <button
          type="button"
          class="js-delete-btn bg-gray-50 text-gray-500 text-sm"
        >
          삭제
        </button>
      </li>
    `;
};

export const subwayLineColorOptionTemplate = (color, index) => {
  const hasNewLine = (index + 1) % 7 === 0;
  return `
    <label class="color-option">
      <input data-color="bg-${color}" name="subway-line-color" value="bg-${color}" type="radio" required />
      <span class="radio bg-${color}"></span>
    </label>
    ${hasNewLine ? "<br/>" : ""}
  `;
};

export const createLineSelectOption = (lineData) => {
  const { id, name } = lineData;

  return `
    <option value="${id}">${name}</option>
  `;
};

export const createLineListItemTemplate = (line) => {
  const upStation = line.sections[0].upStation.name;
  const downStation = line.sections[line.sections.length - 1].downStation.name;
  const duration = line.sections.reduce(
    // eslint-disable-next-line no-return-assign
    (result, station) => (result += station.duration),
    0
  );
  const distance = line.sections.reduce(
    // eslint-disable-next-line no-return-assign
    (result, station) => (result += station.distance),
    0
  );

  return `
    <li 
      data-line-id="${line.id}"
      data-line-name="${line.name}"
      data-line-color="${line.color}"
      class="js-line-list-item py-2 relative border-b-gray"
      >
      <div class="d-flex items-center">
        <span class="js-line-color-dot subway-line-color-dot ${line.color}"></span>
        <span class="js-line-name w-100 pl-6 subway-line-list-item-name">${line.name}</span>
        <button
          type="button"
          class="js-modify-line-btn bg-gray-50 text-gray-500 text-sm mr-1"
        >
          수정
        </button>
        <button
          type="button"
          class="js-delete-line-btn bg-gray-50 text-gray-500 text-sm"
        >
          삭제
        </button>
      </div>

      <div class="js-line-info d-flex d-none pl-3">
        <p>${upStation} ➡️ 거리: ${distance} / 소요시간: ${duration} ➡️ ${downStation}</p>
      </div>
    </li>
  `;
};

const createSectionTemplate = (station, section = {}, color) => {
  return `
    <li class="map-station"><span class="${color}"></span>${station.name}</li>
    ${
      section.distance
        ? `<li class="map-section-info">
      시간 : ${section.duration} / 거리 : ${section.distance}
    </li>`
        : ""
    }
  `;
};

export const createLineTemplate = (line) => {
  const sections = {};
  line.sections.forEach((section) => {
    sections[section.upStation.name] = section;
  });

  return `
    <section class="js-map-line-wrapper">
      <h3 class="map-line-name mt-3">
        ${line.name}
      </h3>
      <ol class="map-line-list">
        ${line.stations
          .map((v) => createSectionTemplate(v, sections[v.name], line.color))
          .join("")}
      </ol>
    </section>
  `;
};
