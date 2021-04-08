export const previewTemplate = sections => {
  return `
    <div class="wrapper p-10 bg-white">
      <div class="heading d-flex">
        <h2 class="mt-1 w-100">🗺️ 전체 보기</h2>
      </div>
      <form name="preview" class="d-flex items-center pl-1">
        <select class="">
          <option value="" selected disabled hidden>노선을 선택해주세요</option>
          ${Object.keys(sections)
            .map(key => {
              `<option value=${key}>${sections[key].name}</option>`;
            })
            .join('')}
        </select>
      </form>
      <ul id="preview-list" class="mt-3 pl-0">
      </ul>
    </div>
    `;
};

export const previewLineTemplate = ({ color, stations, sections }) => {
  return `
    ${previewLineItemTemplate(stations, color)}
    <ul id="preview-section-list">
      ${previewSectionItemTemplate(sections)}
    </ul>
  `;
};

export const previewLineItemTemplate = (stations, color) => {
  return stations
    .map(({ name }) => {
      `<li class="preview-line-item">
        <div class="line ${color}"><span></span></div>
        <span class="station-name">${name}</span>
      </li>`;
    })
    .join('');
};

export const previewSectionItemTemplate = sections => {
  return sections
    .map(section => {
      `<li class="preview-section-item">
        <span>거리 : ${section.distance}</span>
        <div class="divide"></div>
        <span>소요시간 : ${section.duration}</span>
      </li>`;
    })
    .join('');
};
