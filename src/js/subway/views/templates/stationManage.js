import { MENU } from '../../constants/constants';

const stationInfo = ({ name }) => `
  <li class="station-list-item d-flex items-center py-2">
    <span class="w-100 pl-2">${name}</span>
    <button
      type="button"
      class="jse-update-button bg-gray-50 text-gray-500 text-sm mr-1"
      >
      수정
    </button>
    <button
      type="button"
      class="js-remove-button bg-gray-50 text-gray-500 text-sm"
    >
      삭제
    </button>
  </li>
  <hr class="my-0" />
  `;

export const stationList = stations => stations.map(station => stationInfo(station)).join('');

export const stationManage = `
  <div id="content" class="wrapper bg-white p-10">
    <div class="heading">
      <h2 class="mt-1">${MENU.STATIONS}</h2>
    </div>
    <form id="station-add-form">
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
          required
        />
        <button
          type="submit"
          id="station-add-button"
          name="submit"
          class="input-submit bg-cyan-300 ml-2"
          disabled
        >
          확인
        </button>
      </div>
      <div
        id="fail-message-box"
        class="js-message-box message-box hidden mt-1 text-red mb-1 text-center"
        >
        ${MESSAGE.SIGNIN.FAIL}
      </div>
    </form>
    <ul id="station-list" class="mt-3 pl-0">
    </ul>
  </div>
`;
