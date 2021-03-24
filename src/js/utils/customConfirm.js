import { $ } from './index.js';

const confirmTemplate = (message) => {
  return `
    <div class="confirm-modal modal open">
      <div class="confirm-inner">
        <div class="confirm-text">
          <span>${message}</span>
        </div>
        <ul class="confirm-button-list list-style-none p-0">
          <li><button type="button" class="cancel-button mr-3">❌ 취소</button></li>
          <li><button type="button" class="confirm-button">⭕ 확인</button></li>
        </ul>
      </div>
    </div>
    `;
};

export const customConfirm = (message) => {
  return new Promise((resolve, reject) => {
    $('#app').insertAdjacentHTML('beforeend', confirmTemplate(message));
    $('.confirm-modal').addEventListener(
      'click',
      ({ currentTarget, target }) => {
        if (currentTarget === target) {
          currentTarget.remove();
          return;
        }

        if (target.classList.contains('cancel-button')) {
          currentTarget.remove();
          return;
        }

        if (target.classList.contains('confirm-button')) {
          currentTarget.remove();
          resolve('Clicked confirm button.');
        }

        return;
      },
    );
  });
};
