const mainTemplate = (lines) => {
  return `
    <div class="wrapper bg-white p-10">
      <div class="heading d-flex">
        <h2 class="mt-1 w-100">전체 보기</h2>
      </div>
      <div class="js-all-lines-container input-control">
        <div class="js-all-lines-container__div all-lines-container">
          ${lines
            .map((line) => {
              return `
              <div class="subway-lines-container d-flex items-center py-2 relative" data-id="${line.id}">
                <span class="bg-${line.color} subway-line-color-dot" data-id="${line.id}"></span>
                <span class="js-section-form__span subway-lines" data-id="${line.id}">${line.name}</span>
              </div>
              `;
            })
            .join('')}
        </div>
      </div>
      <div class="js-all-stations-container d-flex relative">
        <div class="js-all-stations d-flex"></div>
      </div>
    </div>
  `;
};

const curvedLine = `
  <div class="curved-line-container">
    <div class="curved-line"></div>
  </div>
`;

const connectedLine = (duration, distance) => {
  return `
    <div class="connected-lines py-2">
      <div class="connected-line">
        ${distance}km
      </div>
      <div class="connected-line">
        ${duration}시간
      </div>
    </div>
  `;
};

const stationItem = ({ id, name }, { color }, isLineEnded) => {
  return `
    <div class="subway-lines-container__items d-flex items-center py-2 relative">
      <span class="bg-${color} subway-line-color-dot"></span>
      <span class="w-100 subway-station-item" data-id=${id}>${name}</span>
        ${
          isLineEnded
            ? ''
            : `<div class="connected-lines">
            <div class="connected-line"></div>
            <div class="connected-line"></div>
          </div>`
        }
    </div>

  `;
};

export { mainTemplate, stationItem, connectedLine };
