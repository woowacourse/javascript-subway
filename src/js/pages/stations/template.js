import { STATION_NAME } from '../../constants/service';

export const stationNameEditModalTemplate = `
  <div id="station-name-edit-modal" class="modal" style="z-index:99" hidden>
    <div class="modal-inner p-8">
      <button class="modal-close">
        <svg viewbox="0 0 40 40">
          <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
        </svg>
      </button>
      <header>
        <h2 class="text-center">역 이름 수정</h2>
      </header>
      <form id="station-name-edit-form" data-station-id="">
        <div class="input-control">
          <label for="station-edit-name" class="input-label" hidden
            >수정할 역 이름</label
          >
          <input
            type="text"
            id="station-edit-name"
            name="station-edit-name"
            class="input-field"
            placeholder="수정할 역 이름"
            value=""
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

export const stationListItemTemplate = ({ id, name }) => `
  <li class="js-station-list-item list-item d-flex justify-between items-center py-2" data-id="${id}" data-name="${name}">
    <span class="js-station-name station-name pl-2 w-100">${name}</span>
    <button type="button" class="list-button bg-gray-50 text-gray-500 text-sm mr-1 edit-button js-station-edit-button">수정</button>
    <button type="button" class="list-button bg-gray-50 text-gray-500 text-sm delete-button js-station-delete-button">삭제</button>
  </li>
`;

const stationsPageTemplate = (stationList = []) => `
  <div class="d-flex justify-center mt-5 w-100">
    <div class="w-100">
      <header class="my-4"></header>
      <main id="stations-container" class="mt-10 d-flex justify-center">
        <div class="wrapper bg-white p-10">
          <div class="heading">
            <h2 class="mt-1">🚉 역 관리</h2>
          </div>
          <form id="station-form">
            <div class="d-flex w-100">
              <label for="station-name" class="input-label" hidden> 역 이름 </label>
              <input
                type="text"
                id="station-name"
                name="stationName"
                class="input-field"
                placeholder="역 이름"
                minlength="${STATION_NAME.MIN_LENGTH}"
                maxlength="${STATION_NAME.MAX_LENGTH}"
                required
              />
              <button type="submit" name="submit" class="input-submit bg-cyan-300 ml-2">확인</button>
            </div>
          </form>
          <ul id="station-list" class="mt-3 pl-0">
            ${stationList.map(station => stationListItemTemplate(station)).join('')}
          </ul>
        </div>
      </main>
    </div>
  </div>
  ${stationNameEditModalTemplate}
`;

{
  /*  station list item template

    <li class="station-list-item d-flex items-center py-2">
        <span class="w-100 pl-2">사당</span>
        <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1">수정</button>
        <button type="button" class="bg-gray-50 text-gray-500 text-sm">삭제</button>
      </li>
      <hr class="my-0" /> */
}

export default stationsPageTemplate;
