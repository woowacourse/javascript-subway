export default `
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
          pattern="[가-힣]+||[^A-Za-z0-9 !@#$%^&*]"
          autocomplete="off" 
          required
          autofocus
        />
        <button
          id="station-name-submit"
          type="submit"
          name="submit"
          class="input-submit bg-cyan-300 ml-2"
        >
          확인
        </button>
      </div>
      <p 
        id="station-duplicated-warning" 
        class="text-xs text-red w-100 ml-5 my-1 d-none"
      >지하철 역이 이미 존재합니다.</p>
    </form>
    <ul class="mt-3 pl-0">
      <li class="station-list-item d-flex items-center py-2">
        <span class="station-item-name w-100 pl-2">사당</span>
        <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm mr-1"
          data-action="edit"
        >
          수정
        </button>
        <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm"
          data-action="delete"
        >
          삭제
        </button>
      </li>
      <hr class="my-0" />
      <li class="station-list-item d-flex items-center py-2">
        <span class="station-item-name w-100 pl-2">방배</span>
        <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm mr-1"
          data-action="edit"
        >
          수정
        </button>
        <button 
          type="button" 
          class="bg-gray-50 text-gray-500"
          data-action="delete"
        >
          삭제
        </button>
      </li>
      <hr class="my-0" />
    </ul>
  </div>
`;
