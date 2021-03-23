import { PATH } from '../../constants/path';

const loginTemplate = `
  <div class="wrapper p-10 bg-white">
    <div class="heading">
      <h2>👋 로그인</h2>
    </div>
    <form id="login-form" name="login" class="form">
      <div class="input-control js-input-control">
        <label for="email" class="input-label" hidden>이메일</label>
        <input
          type="email"
          id="email"
          name="email"
          class="input-field"
          placeholder="이메일"
          required
        />
        <small id="email-form-message" class="d-flex mr-auto px-3 mt-1 d-none">알맞은 이메일 형식을 입력해 주세요.</small>
      </div>
      <div class="input-control js-input-control">
        <label for="password" class="input-label" hidden
          >비밀번호</label
        >
        <input
          type="password"
          id="password"
          name="password"
          class="input-field"
          placeholder="비밀번호 (영문자, 숫자 조합의 6-15자)"
          required
        />
        <small id="password-fail-message" class="d-flex mr-auto px-3 mt-1 d-none">알맞은 비밀번호 형식을 입력해 주세요.</small>
      </div>
      <div class="input-control w-100">
        <button
          type="submit"
          name="submit"
          class="input-submit w-100 bg-cyan-300"
        >
          확인
        </button>
      </div>
      <p class="text-gray-700 pl-2">
        아직 회원이 아니신가요?
        <a id="signup" href="${PATH.SIGNUP}">회원가입</a>
      </p>
    </form>
  </div>
`;

export default loginTemplate;
