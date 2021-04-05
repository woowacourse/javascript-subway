import { SELECTOR } from '../../constants';
import { MENU, MESSAGE } from '../../constants/constants';

export const signUp = `
  <div id="main-content" class="p-10 bg-white">
    <div class="heading">
      <h2 class="text">${MENU.SIGNUP}</h2>
    </div>
    <form id="${SELECTOR.USER_JOIN.MAIN.FORM}" name="signup" class="form">
      <div class="input-control flex-col">
        <div class="d-flex w-100 items-center">
          <label for="email" class="input-label" hidden>이메일</label>
          <input
            type="email"
            id="${SELECTOR.USER_JOIN.MAIN.EMAIL_INPUT}"
            name="email"
            class="input-field"
            placeholder="이메일"
            required
          />
        </div>
        <div id="${SELECTOR.USER_JOIN.MAIN.EMAIL_MSG}" class="js-message-box message-box mt-1 text-red"></div>
      </div>
      <div class="input-control flex-col">
        <div class="d-flex w-100">
          <label for="password" class="input-label" hidden
            >비밀번호</label
          >
          <input
            type="password"
            id="${SELECTOR.USER_JOIN.MAIN.PASSWORD_INPUT}"
            name="password"
            class="input-field"
            placeholder="비밀번호"
          />
        </div>
        <div id="${SELECTOR.USER_JOIN.MAIN.PASSWORD_MSG}" class="js-message-box message-box hidden mt-1 text-red">${MESSAGE.SIGNUP.INVALID_PASSWORD}</div>
      </div>
      <div class="input-control flex-col">
        <div class="d-flex w-100">
          <label for="password-confirm" class="input-label" hidden
            >비밀번호 확인</label
          >
          <input
            type="password"
            id="${SELECTOR.USER_JOIN.MAIN.PASSWORD_CONFIRM_INPUT}"
            name="password-confirm"
            class="input-field"
            placeholder="비밀번호 확인"
          />
        </div>
        <div id="${SELECTOR.USER_JOIN.MAIN.PASSWORD_CONFIRM_MSG}" class="js-message-box message-box hidden mt-1 text-red">${MESSAGE.SIGNUP.INVALID_PASSWORD_CONFIRM}</div>
      </div>
      <div class="input-control flex-col">
        <div class="d-flex w-100">
          <label for="name" class="input-label" hidden>이메일</label>
          <input
            type="text"
            id="${SELECTOR.USER_JOIN.MAIN.NAME_INPUT}"
            name="name"
            class="input-field"
            placeholder="이름"
            required
          />
        </div>
        <div id="${SELECTOR.USER_JOIN.MAIN.NAME_MSG}" class="js-message-box message-box hidden mt-1 text-red">${MESSAGE.SIGNUP.INVALID_NAME}</div>
    </div>
      <div class="input-control">
        <button
          type="submit"
          id="signup-button"
          name="submit"
          class="input-submit w-100 bg-cyan-300"
        >
          확인
        </button>
      </div>
    </form>
  </div>
`;
