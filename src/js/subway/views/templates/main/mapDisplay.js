import { MENU } from '../../../constants/constants';

export const lineButton = ({ id, name, color }) => `
<li
  data-id=${id}
  data-name=${name}
  data-color=${color}
  class="js-line-list-item d-flex items-center my-5"
>
  <button
    type="button"
    class="js-line-modal-button line-modal-button w-100 bg-white text-lg"
  >
    <span class="line-button-color-dot ${color}">
    </span>
    ${name}
  </button>
</li>
`;

export const lineButtonList = lines => lines.map(lineButton).join('');

export const mapDisplay = `
<div id="main-content" class="manage wrapper bg-white p-10">
  <div class="heading d-flex">
    <h2 class="mt-1 w-100">${MENU.MAP}</h2>
  </div>
  <ul id="line-button-list" class="mt-3 pl-0">
  </ul>
</div>
`;
