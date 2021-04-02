export const sectionListTemplate = ({ name, duration, distance, color }) => {
  return `
    <li class="section-list-item list-style-none">
      <div class="d-flex items-center relative">
        <div class="d-flex justify-center align-center">
          <span class="subway-line-color-dot ${color}" style="background-color: ${color}"></span>
          <div class="vertical-line-bar ${color}" style="background-color: ${color}"></div>
        </div>
        <span class="w-100 pl-6 section-name">${name}</span>

      </div>
      ${
        duration && distance
          ? `<div class="sections-bottom-line"></div>
            <div class="section-info-container">
              <span class="section-info chip bg-blue-100">시간: ${duration}분</span>
              <span class="section-info chip bg-blue-100">거리: ${distance}Km</span>
            </div>`
          : ''
      } 
    </li>
    `;
};

const sectionListContainerTemplate = (section) => {
  return `<ul class="section-list-container">
                ${section.map((station) => sectionListTemplate(station)).join('')}
            </ul>`;
};

export const subwayMapTemplate = (sortedSectionList = []) => {
  console.log(sortedSectionList);
  return `
    <div class="stations-container container wrapper bg-white p-10">
        <div class="heading">
          <h2 class="mt-1">🗺 전체 보기</h2>
        </div>
        ${sortedSectionList.map((section) => sectionListContainerTemplate(section)).join('')}
    </div>
    `;
};
