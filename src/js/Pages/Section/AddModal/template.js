const modal = ({ state: { stations, lines }, modalKey }) => {
  return `
    <div class="modal modal-${modalKey}">
      <div class="modal-inner p-8">
        <button class="modal-close">
          <svg viewbox="0 0 40 40">
            <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
          </svg>
        </button>
        <header>
          <h2 class="text-center">🔁 구간 추가</h2>
        </header>
        <form id="create-section-form">
          <div class="input-control mb-3">
            <select name="select-line">
            ${lines
              .map((line) => {
                return `<option value="${line.id}">${line.name}</option>`;
              })
              .join('')}
            </select>
          </div>
          <div class="d-flex items-center input-control mb-3">
            <select name="up-station">
              <option value="" selected disabled hidden>이전역</option>
              ${stations
                .map((station) => {
                  return `<option value="${station.id}">${station.name}</option>`;
                })
                .join('')}
            </select>
            <div class="d-inline-block mx-3 text-2xl">➡️</div>
            <select name="down-station">
              <option value="" selected disabled hidden>다음역</option>
              ${stations
                .map((station) => {
                  return `<option value="${station.id}">${station.name}</option>`;
                })
                .join('')}
            </select>
          </div>
          <div class="input-control mb-3">
            <label for="distance" class="input-label" hidden
              >거리</label>
            <input
              type="number"
              id="distance"
              name="distance"
              class="input-field mr-2"
              placeholder="거리"
              required
            />
            <label for="duration" class="input-label" hidden
              >시간</label
            >
            <input
              type="number"
              id="duration"
              name="arrival"
              class="input-field"
              placeholder="시간"
              required
            />
          </div>
          <div class="d-flex justify-end mt-3">
            <button
              type="submit"
              name="submit"
              class="input-submit bg-cyan-300"
            >
              확인
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
};

export default modal;
