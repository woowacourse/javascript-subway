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
              return `<option value=${key}>${sections[key].name}</option>`;
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
  return `${stations
    .map(({ name }) => {
      return `
      <li class="preview-line-item">
        <div class="line ${color}"><span></span></div>
        <span class="station-name">${name}</span>
      </li>
      
    `;
    })
    .join('')}
    
    <ul id="preview-section-list">
    ${sections
      .map(section => {
        return ` 
        <li class="preview-section-item">
          <span>거리 : ${section.distance}</span>
          <div class="divide"></div>
          <span>소요시간 : ${section.duration}</span>
        </li>`;
      })
      .join('')}
      </ul>
    `;
};
