const sectionItem = ({ id, name }) => {
  return `
    <li class="js-section-item d-flex items-center py-2 relative" data-station-id=${id}>
      <span class="w-100 pl-6">${name}</span>
      <button
        type="button"
        class="js-section-item__delete bg-gray-50 text-gray-500 text-sm"
      >
        삭제
      </button>
    </li>
  `;
};

const mainTemplate = ({ state: { lines } }) => {
  return `
    <div class="wrapper bg-white p-10">
      <div class="heading d-flex">
        <h2 class="mt-1 w-100">🔁 구간 관리</h2>
        <button
          type="button"
          class="js-section-item__create create-section-btn modal-trigger-btn bg-cyan-300 ml-2"
        >
          구간 추가
        </button>
      </div>
      <form class="input-control">
        <select class="js-section-form__select">
          <option value="" selected disabled hidden>노선을 선택해 주세요.</option>
          ${lines.map((line) => {
            return `<option value="${line.id}">${line.name}</option>`;
          })}
        </select>
      </form>
      <ul class="js-section-list mt-3 pl-0"></ul>
    </div>
  `;
};

export { mainTemplate, sectionItem };
