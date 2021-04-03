export const stationModal = ({ modalName }) => `
  <div class="modal ${modalName}-modal">
    <div class="modal-inner p-8">
      <button class="modal-close">
        <svg viewbox="0 0 40 40">
          <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
        </svg>
      </button>
      <header>
        <h2 class="text-center">🛤️ 역 수정</h2>
      </header>
      <form id="${modalName}-form">
        <div class="input-control">
          <label for="${modalName}-name" class="input-label" hidden
            >역 이름</label
          >
          <input
            type="text"
            id="${modalName}-name"
            name="name"
            class="input-field"
            placeholder="역 이름"
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
