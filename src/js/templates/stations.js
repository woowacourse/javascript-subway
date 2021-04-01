export const getStationsTemplate = () => `
    <div class="wrapper bg-white p-10">
      <div class="heading">
        <h2 class="mt-1">🚉 역 관리</h2>
      </div>
      <form class="station-form">
        <div class="d-flex w-100">
          <label for="station-name" class="input-label" hidden> 역 이름 </label>
          <input id="station-name" name="stationName" class="input-field" placeholder="역 이름" maxlength='20' minlength='2' required />
          <button type="submit" name="submit" class="input-submit bg-cyan-300 ml-2">등록</button>
        </div>
      </form>
      <ul class="station-list-wrapper mt-3 pl-0"></ul>
    </div>
    <div class="modal">
      <div class="modal-inner p-8">
        <button class="modal-close">
          <svg viewbox="0 0 40 40">
            <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
          </svg>
        </button>
        <header>
          <h2 class="text-center">🚉 역 이름 수정</h2>
        </header>
        <form class="modal__station-name-edit-form">
          <div class="d-flex w-100">
            <label for="station-name" class="input-label" hidden> 역 이름 </label>
            <input id="station-name" name="stationName" class="modal__station-name-edit-input input-field" placeholder="역 이름" maxlength='20' minlength='2' required />
            <button type="submit" name="submit" class="input-submit bg-cyan-300 ml-2">수정</button>
          </div>
        </form>
      </div>
    </div>
  `;

export const getStationListTemplate = (stationName) => `
  <li class="station-list-item" data-station-name=${stationName}>
    <div class="d-flex items-center py-2">
      <span class="w-100 pl-2">${stationName}</span>
      <button 
        type="button"      
        class="station-list-item__edit-button bg-gray-50 text-gray-500 text-sm mr-1" 
        >
          수정
      </button>
      <button 
        type="button" 
        class="station-list-item__remove-button bg-gray-50 text-gray-500 text-sm" 
        >
          삭제
      </button>
    </div>
    <hr class="my-0" />
  </li>
`;
