export const subwayMapTemplate = sections => {
  return `
  <div class="wrapper bg-white p-10">
    <div class="heading d-flex">
      <h2 class="mt-1 w-100">🗺️ 전체 보기</h2>
    </div>
    <ul id="subway-map-list" class="mt-3 pl-0">
    ${Object.keys(sections)
      .map(id => `${sectionListTemplate(sections[id])}`)
      .join('')}
    </ul>
  </div>
  `;
};

const sectionListTemplate = ({ name, color, stations }) => {
  return `
    <h3 class="line-item-info">
      <span class="subway-line-color-dot ${color}"></span>
      <span class="w-100 pl-6 subway-line-list-item-name">${name}</span>
    </h3>
    <ul class="subway-map-section-list">  
      ${stations
        .map(station => sectionItemTemplate(station.name, color))
        .join('')}
    </ul>
  `;
};

const sectionItemTemplate = (name, color) => {
  return `
  <li class="subway-map-section-item ${color}">
    <span class="subway-map-section-item-name">${name}</span>
  </li>
  `;
};
