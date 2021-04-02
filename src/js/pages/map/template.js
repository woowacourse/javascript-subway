const lineListItemTemplate = line => `
  <li class="d-flex items-center list-item">
    <div class="mr-6 d-flex items-center map-line-name">
      <span class="subway-line-color-dot ${line.color}"></span>
      <div class="ml-6 w-fit-content">${line.name}</div>
    </div>
    <div>
      ${line.stations.map(station => `<span>${station.name}</span>`).join('<span class="mx-4">-</span>')}
    </div>
  </li>
`;

const lineListItemsTemplate = lines => lines.map(line => lineListItemTemplate(line)).join('');

const mapPageTemplate = lines => `
  <div class="d-flex justify-center mt-5 w-100">
    <div class="w-100">
      <header class="my-4"></header>
      <main class="mt-10 d-flex justify-center">
        <div class="wrapper bg-white p-10">
          <div class="heading d-flex">
            <h2 class="mt-1 w-100">🗺 전체보기</h2>
          </div>
          <ul class="js-map-list mt-3 pl-0">
            ${lineListItemsTemplate(lines)}
          </ul>
        </div>
      </main>
    </div>
  </div>
`;

export default mapPageTemplate;
