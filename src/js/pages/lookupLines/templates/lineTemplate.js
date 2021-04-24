function sectionItemTemplate({ distance, duration }) {
  return `
    <div id="section" class="d-flex mx-auto">
      <span id="distance" class="d-flex ml-auto pt-2 pr-2 section-item">${distance}km</span>
      <span id="duration" class="d-flex mr-auto pt-2 pl-2 section-item">${duration}분</span>
    </div>  
      `;
}

function stationItemTemplate({ id, name }, color) {
  return `
    <li class="station-list-item d-flex mx-auto" data-section-id=${id} data-section-name=${name}>
      <div id="station-name-wrapper" class="d-flex mx-auto border-solid border-${color} border-2">
        <span id="station-name" class="d-flex m-auto ">${name}</span>
      </div>
    </li>`;
}

function lineTemplate(stations, sections, color) {
  const line = Array.from({ length: sections.length }, (_, index) => {
    return (
      stationItemTemplate(Object.values(stations)[index], color) +
      sectionItemTemplate(sections[index])
    );
  }).join('');

  return (
    line +
    stationItemTemplate(Object.values(stations)[stations.length - 1], color)
  );
}

export { stationItemTemplate, lineTemplate };
