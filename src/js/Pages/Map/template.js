const sectionTemplate = ({ color, sections, stations }) => {
  return `
    <div class="d-flex flex-col">
      <div>${sections
        .map(({ distance }) => `<span>거리: ${distance}</span>`)
        .join('')}
      </div>
      <div>${sections
        .map(({ duration }) => `<span>시간: ${duration}</span>`)
        .join('')}
      </div>
      <div class="d-flex">
        ${stations
          .map(({ name }) => {
            return `
              <div class="d-flex flex-col justify-center items-center">
                <div class="map-stations" data-bg-color=${color}>
                  <div class="map-stations__station-circle"></div>
                </div>
                <span class="map-stations__name-circle">${name}</span>
              </div>
            `;
          })
          .join('')}
      </div>
    </div>
  `;
};

const lineTemplate = (line) => {
  return `
    <ul class="map">
      <span>${line.name}</span>
      <li>
        ${sectionTemplate(line)}
      </li>
    </ul>
  `;
};

const template = ({ state: { lines } }) => {
  return `
    <div class="wrapper bg-white p-10">
      ${lines.map(lineTemplate).join('')}
    </div>
  `;
};

export default template;
