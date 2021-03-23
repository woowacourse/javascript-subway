import { STATION_NAME } from '../constants';

export const stationListItemTemplate = ({ id, name }) => `
  <li class="station-list-item d-flex justify-between items-center" data-id="${id}" data-name="${name}">
    <input type="text" class="js-name-edit name-edit w-100 pl-2 py-2" value="${name}" minlength="${STATION_NAME.MIN_LENGTH}" maxlength="${STATION_NAME.MAX_LENGTH}" />
    <span class="station-name pl-2">${name}</span>
    <div class="button-wrapper non-editing-buttons">
      <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 edit-button js-station-edit-button">수정</button>
      <button type="button" class="bg-gray-50 text-gray-500 text-sm delete-button js-station-delete-button">삭제</button>
    </div>
    <div class="button-wrapper editing-buttons">
      <button type="button" class="bg-gray-50 text-gray-500 text-sm save-button js-station-save-button">저장</button>
      <button type="button" class="bg-gray-50 text-gray-500 text-sm cancel-button js-station-cancel-button">취소</button>
    </div>
  </li>
  <hr class="my-0" />
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
