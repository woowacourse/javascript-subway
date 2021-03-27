export const stationsTemplate = stations => {
  return `            
  <div class="wrapper bg-white p-10">
    <div class="heading">
      <h2 class="mt-1">🚉 역 관리</h2>
    </div>
    <form name="add-station">
      <div class="d-flex w-100">
        <label for="station-add-input" class="input-label" hidden>
          역 이름
        </label>
        <input
          type="text"
          id="station-add-input"
          name="station-add-input"
          class="input-field"
          placeholder="역 이름"
          required
        />
        <button
          id="station-add-button"
          name="submit"
          class="input-submit bg-cyan-300 ml-2"
        >
          확인
        </button>
      </div>
    </form>
    <ul id="station-list" class="mt-3 pl-0">
      ${stations.map(stationTemplate).join('')}
    </ul>
  </div>`;
};

export const stationTemplate = ({ id, name }) => {
  return `
  <li class="station-list-item d-flex items-center py-2" data-station-id=${id}>
  <span class="w-100 pl-2">${name}</span>
  <button
  type="button"
  class="modify-button bg-gray-50 text-gray-500 text-sm mr-1"
>
  수정
</button>
<button type="button" class="delete-button bg-gray-50 text-gray-500">
  삭제
</button>
</li>
`;
};

export const modalTemplate = () => {
  return `
  <div class="modal-inner p-8">
  <button class="modal-close">
    <svg viewbox="0 0 40 40">
      <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
    </svg>
  </button>
  <header>
    <h2 class="text-center">🔁 역 수정</h2>
  </header>
  <form name="modify-station">
    <div class="input-control">
      <label for="station-modify-input" class="input-label" hidden>역 가</label>
      <input
        id="station-modify-input"
        name="station-modify-input"
        class="input-field"
        placeholder="변경할 역명을 작섷해주세요."
        required
      />
    </div>
    <div class="d-flex justify-end mt-3">
      <button
        id="station-modify-button"
        type="submit"
        name="submit"
        class="input-submit bg-cyan-300"
      >
        확인
      </button>
    </div>
  </form>
</div>
  `;
};
