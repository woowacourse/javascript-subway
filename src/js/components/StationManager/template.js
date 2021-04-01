export const contentTemplate = `
  <div class="wrapper bg-white p-10">
    <div class="heading">
      <h2 class="mt-1">🚉 역 관리</h2>
    </div>
    <form id="station-name-form">
      <div class="d-flex w-100">
        <label for="station-name" class="input-label" hidden>
          역 이름
        </label>
        <input
          type="text"
          id="station-name"
          name="stationName"
          class="input-field"
          placeholder="역 이름"
          minlength="2"
          maxlength="20"
          pattern="[가-힣0-9]+||[^A-Za-z !@#$%^&*]"
          autocomplete="off" 
          required
          autofocus
        />
        <button
          id="station-name-submit"
          type="submit"
          name="submit"
          class="input-submit bg-cyan-300 ml-2 flex-1 text-white font-semibold"
        >
          추가
        </button>
      </div>
      <p 
        id="station-duplicated-warning" 
        class="text-xs text-red w-100 ml-5 my-1 d-none"
      >지하철 역이 이미 존재합니다.</p>
    </form>
    <ul id="station-list" class="mt-3 pl-0">
    </ul>
  </div>
`;

export const modalTemplate = `
  <div class="modal-inner p-8">
    <button class="modal-close">
      <svg viewbox="0 0 40 40">
        <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
      </svg>
    </button>
    <header>
      <h2 class="text-center">🦕 역 이름 변경</h2>
    </header>
    <form id="station-name-edit-form">
      <div class="input-control d-flex flex-col">
        <label for="station-name-edit" class="input-label self-start ml-4 text-sm text-gray-800">변경할 이름을 입력해주세요.</label
        >
        <input
          type="text"
          id="station-name-edit"
          name="station-name-edit"
          class="input-field box-border"
          minlength="2"
          maxlength="20"
          pattern="[가-힣0-9]+||[^A-Za-z !@#$%^&*]"
          autocomplete="off" 
          required
        />
        <p 
        id="station-edit-duplicated-warning" 
        class="text-xs text-red w-100 ml-8 my-1 d-none"
      >동일한 역 이름이 존재합니다.</p>
      </div>
      
      <div class="d-flex justify-end mt-3">
        <button
          type="submit"
          name="submit"
          id="modal-station-edit"
          class="input-submit bg-cyan-300"
        >
          확인
        </button>
      </div>
    </form>
  </div>
`;
