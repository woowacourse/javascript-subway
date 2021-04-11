import { CLASS_SELECTOR, ID_SELECTOR, URL } from '../constants';

const MAIN_COMPONENT = `
<div class="wrapper p-10 bg-white">
  <div class="heading">
    <h2>👋 로그인</h2>
  </div>
  <form id="${ID_SELECTOR.LOGIN_FORM}" name="login" class="form">
    <div class="input-control">
      <label for="email" class="input-label" hidden>이메일</label>
      <input
        type="email"
        id="${ID_SELECTOR.LOGIN_FORM_EMAIL}"
        name="email"
        class="input-field"
        placeholder="이메일"
        required
      />
    </div>
    <div class="input-control">
      <label for="password" class="input-label" hidden
        >비밀번호</label
      >
      <input
        type="password"
        id="${ID_SELECTOR.LOGIN_FORM_PASSWORD}"
        name="password"
        class="input-field"
        placeholder="비밀번호"
        required
      />
    </div>
    <div class="input-control w-100">
      <button
        id="${ID_SELECTOR.LOGIN_FORM_SUBMIT}"
        type="submit"
        name="submit"
        class="input-submit w-100 bg-cyan-300"
      >
        확인
      </button>
    </div>
    <p class="text-gray-700 pl-2">
      아직 회원이 아니신가요?
      <a href="${URL.SIGNUP}" class="${CLASS_SELECTOR.ANCHOR}">회원가입</a>
    </p>
  </form>
</div>
`;

const LOGIN_TEMPLATE = {
  TITLE: `🚇 로그인`,
  MAIN: MAIN_COMPONENT,
};

export default LOGIN_TEMPLATE;
