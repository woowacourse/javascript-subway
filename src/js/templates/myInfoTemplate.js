import { ID_SELECTOR } from '../constants';

const MAIN_COMPONENT = `
<div class="wrapper p-10 bg-white">
  <div class="heading">
    <h2 class="text">🔒 내 정보</h2>
  </div>
  <form id="${ID_SELECTOR.MY_INFO_FORM}" name="login" class="form">
    <div class="input-control">
      <label for="${ID_SELECTOR.MY_INFO_FORM_EMAIL}" class="input-label" hidden>이메일</label>
      <input
        type="email"
        id="${ID_SELECTOR.MY_INFO_FORM_EMAIL}"
        name="email"
        class="input-field"
        placeholder="이메일"
        required
      />
    </div>
    <div class="input-control">
      <label for="${ID_SELECTOR.MY_INFO_FORM_NAME}" class="input-label" hidden>이름</label>
      <input
        type="text"
        id="${ID_SELECTOR.MY_INFO_FORM_NAME}"
        name="name"
        class="input-field"
        placeholder="이름"
        required
      />
    </div>
    <div class="input-control">
      <label for="${ID_SELECTOR.MY_INFO_FORM_PASSWORD}" class="input-label" hidden
        >비밀번호</label
      >
      <input
        type="password"
        id="${ID_SELECTOR.MY_INFO_FORM_PASSWORD}"
        name="password"
        class="input-field"
        placeholder="비밀번호"
      />
    </div>
    <div class="input-control">
      <label for="${ID_SELECTOR.MY_INFO_FORM_PASSWORD_CONFIRM}" class="input-label" hidden
        >비밀번호 확인</label
      >
      <input
        type="password"
        id="${ID_SELECTOR.MY_INFO_FORM_PASSWORD_CONFIRM}"
        name="password-confirm"
        class="input-field"
        placeholder="비밀번호 확인"
      />
    </div>
    <div class="input-control">
      <button
        id="${ID_SELECTOR.MY_INFO_FORM_SUBMIT}"
        type="submit"
        name="submit"
        class="input-submit w-100 bg-cyan-300"
      >
        정보 수정
      </button>
    </div>
  </form>
</div>
`;

const MY_INFO_TEMPLATE = {
  TITLE: `🔒 내 정보`,
  MAIN: MAIN_COMPONENT,
};

export default MY_INFO_TEMPLATE;
