import { MENU } from '../../constants/constants';

export const sectionInfo = ({ id, name, distance, duration }) => `
  <li data-station-id=${id} class="js-station-list-item d-flex items-center py-2 my-2">
    <span class="js-station-name w-100 pl-2">${name}</span>
    <button
      type="button"
      class="js-remove-button bg-gray-50 text-gray-500 text-sm"
    >
      삭제
      </button>
      ${
        distance && duration
          ? `
          <div class="sectionInfo">
            <span>></span>
            <span class="text-xs text-brown ">거리: ${distance}km</span>
            <span class="text-xs text-blue">시간: ${duration}분</span>
          </div>`
          : ''
      }
  </li>
  `;

export const sectionList = (stations, sections) => {
  return stations.map((station, index) => sectionInfo({ ...station, ...sections[index] })).join('');
};

export const sectionManage = `
  <div id="main-content" class="manage wrapper bg-white p-10">
    <div class="heading d-flex">
      <h2 class="mt-1 w-100">${MENU.SECTIONS}</h2>
      <button
        id="section-add-modal-button"
        type="button"
        class="create-section-btn modal-trigger-btn bg-cyan-300 ml-2"
      >
        구간 추가
      </button>
    </div>
    <form class="d-flex items-center pl-1 relative">
      <select id="main-line-selector">
      </select>
    </form>
    <ul id="section-list" class="mt-3 pl-0">
    </ul>
  </div>
`;
