import { ID_SELECTOR } from '../constants';

const MAIN_COMPONENT = `
<div class="wrapper p-10 bg-white">
  <div class="heading">
    <h2 class="text">📝 회원가입</h2>
  </div>
  <form id="${ID_SELECTOR.SIGNUP_FORM}" name="login" class="form">
    <div class="input-control">
      <label for="${ID_SELECTOR.SIGNUP_FORM_EMAIL}" class="input-label" hidden>이메일</label>
      <input
        type="email"
        id="${ID_SELECTOR.SIGNUP_FORM_EMAIL}"
        name="email"
        class="input-field"
        placeholder="이메일"
        required
      />
    </div>
    <div class="input-control">
      <label for="${ID_SELECTOR.SIGNUP_FORM_NAME}" class="input-label" hidden>이름</label>
      <input
        type="text"
        id="${ID_SELECTOR.SIGNUP_FORM_NAME}"
        name="name"
        class="input-field"
        placeholder="이름"
        pattern="^[a-zA-Zㄱ-힣]+$"
        title="이름은 알파벳, 한글만 가능합니다"
        required
      />
    </div>
    <div class="input-control">
      <label for="${ID_SELECTOR.SIGNUP_FORM_PASSWORD}" class="input-label" hidden
        >비밀번호</label
      >
      <input
        type="password"
        id="${ID_SELECTOR.SIGNUP_FORM_PASSWORD}"
        name="password"
        class="input-field"
        placeholder="비밀번호"
        pattern="\S+"
        required
        title="비밀번호는 공백을 제외한 문자만 가능합니다."
      />
    </div>
    <div class="input-control">
      <label for="${ID_SELECTOR.SIGNUP_FORM_PASSWORD_CONFIRM}" class="input-label" hidden
        >비밀번호 확인</label
      >
      <input
        type="password"
        id="${ID_SELECTOR.SIGNUP_FORM_PASSWORD_CONFIRM}"
        name="password-confirm"
        class="input-field"
        placeholder="비밀번호 확인"
        pattern="\S+"
        required
        title="비밀번호는 공백을 제외한 문자만 가능합니다."
      />
    </div>
    <div class="input-control">
      <button
        id="${ID_SELECTOR.SIGNUP_FORM_SUBMIT}"
        type="submit"
        name="submit"
        class="input-submit w-100 bg-cyan-300"
      >
        확인
      </button>
    </div>
  </form>
</div>
`;

const SIGNUP_TEMPLATE = {
  TITLE: `🚇 회원가입`,
  MAIN: MAIN_COMPONENT,
};

export default SIGNUP_TEMPLATE;
