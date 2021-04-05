import { SELECTOR } from '../../constants';

export const stationModify = `
<div id="modal-content" class="modal-inner p-8">
  <button class="modal-close">
    <svg viewbox="0 0 40 40">
      <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
    </svg>
  </button>
  <header>
    <h2 class="text-center">역 이름 변경</h2>
  </header>
  <form id="${SELECTOR.STATION.MODAL.FORM}" class="d-flex flex-col">
    <div class="d-flex justify-between">
    <div class="">
      <label for="station-modify-name" class="input-label" hidden>역 이름</label>
      <input
        type="text"
        id="${SELECTOR.STATION.MODAL.NAME_INPUT}"
        name="station-modify-name"
        class="input-field"
        placeholder="역 이름"
        required
      />
    </div>
      <button id="${SELECTOR.STATION.MODAL.SUBMIT_BUTTON}" type="submit" name="submit" class="input-submit bg-cyan-300" disabled>확인</button>
    </div>
    <div
      id="${SELECTOR.STATION.MODAL.NAME_MSG}"
      class="js-message-box message-box mt-1 text-red mb-1 text-center"
      >
    </div>
  </form>
</div>
`;