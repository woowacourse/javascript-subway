const renderSectionTemplate = line => {
  console.log(line);

  return `
    <li class="line-in-map">
      <div class="line-color-dot ${line.color}"></div>
      <p class="line-name-in-map">${line.name}</p>
      <ol class="d-flex">${line.sections
        .map(
          station => `
          <li class="station-list-in-map">
            <div class="station-in-map 
              ${station.transferLines.length ? 'transfer' : ''}">
                ${station.name}
            </div>
          </li>`
        )
        .join('')}</ol>
    </li>`;
};

const mapTemplate = map => {
  return `  
  <div class="wrapper bg-white p-10">
    <div class="heading">
      <h2 class="mt-1">🖼 전체 보기</h2>
    </div>
    
    <ul id="map">
      ${map.map(renderSectionTemplate).join('')}
    </ul>
  </div>`;
};

export default mapTemplate;
