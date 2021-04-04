import { DOM } from '../../../constants';

export const mapStationInfo = (name, distance, duration) => `
<li class="text-lg d-flex relative">
  <span class="line-color-bar mr-4
  ${DOM.MAP.MODAL.LIST.dataset.color}
  ">
  </span>
  <span class="stop-station-dot bg-white"></span>
  <span>${name}</span>
  <span class="ml-2 text-sm">(${distance}km,&nbsp${duration}분)</span>
</li>
`;

export const mapSectionInfo = (section, idx, sections) => {
  const { upStation, downStation, distance, duration } = section;
  let sectionInfo = mapStationInfo(upStation.name, distance, duration);

  if (idx !== sections.length - 1) return sectionInfo;

  sectionInfo += `
  <li class="text-lg d-flex relative">
    <span class="line-color-bar mr-4 hidden"></span>
    <span class="stop-station-dot bg-white"></span>
    <span>${downStation.name}</span>
  </li>
  `;

  return sectionInfo;
};

export const map = sections => sections.map(mapSectionInfo).join('');

export const lineDisplay = `
<div id="modal-content" class="line-display-modal modal-inner p-8">
  <button class="modal-close">
    <svg viewbox="0 0 40 40">
      <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
    </svg>
  </button>
  <div class="d-flex flex-col items-center">
    <header>
      <h2 id="line-display-modal-name" class="text-center"></h2>
    </header>
    <ul id="line-display-modal-list" class="mt-3 pl-0">
    </ul>
  </div>
</div>
`;
