const sectionTemplate = ({ color, stations }) => {
  return `
    <div class="map-stations">
      <div class="d-flex flex-row">
        ${stations
          .map(({ name }) => {
            return `
              <div class="d-flex flex-col justify-center items-center">
                <div class="map-stations__line" data-bg-color=${color}>
                  <div class="map-stations__station-circle border-color=${color}"></div>
                </div>
                <div class="map-stations__name-circle-wrapper">
                  <span class="map-stations__name-circle">${name}</span>
                </div>
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
      <h2 class="map__line-title">${line.name}</h2>
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
