function lookupLinesTemplate(allLines = {}) {
  return `
  <div class="wrapper bg-white p-10">
    <div class="heading d-flex">
      <h2 class="mt-1 w-100">🎇 모든 노선 조회</h2>
    </div>

    <form id="lookup-lines-form" class="d-flex items-center pl-1">
      <label for="line-name" class="input-label" hidden>노선 이름</label>
      <select id="line-name">
      <option value="" selected disabled hidden>노선 선택</option>
        ${Object.values(allLines)
          .map(
            line =>
              `<option value=${line.id} data-line-color="${line.color}" class="bg-white">${line.name}</option>`
          )
          .join('')}
      </select>
    </form>
    <ul id="line-info" class="mt-10"></ul>
  </div>`;
}

export { lookupLinesTemplate };
