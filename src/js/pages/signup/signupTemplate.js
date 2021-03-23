import { PATH } from '../../constants/path';

const signupTemplate = `
  <div class="wrapper p-10 bg-white">
    <div class="heading">
      <h2 class="text">📝 회원가입</h2>
    </div>
    <form id="signup-form" name="signup" class="form">
      <div id="email-input" class="input-control js-input-control">
        <label for="email" class="input-label" hidden>이메일</label>
        <div class="d-flex justify-between w-100">
          <input
          type="email"
          id="email"
          name="email"
          class="input-field"
          placeholder="이메일"
          required
          />
          <button id="check-duplicated-email-button" type="button" class="input-submit bg-cyan-100">중복체크</button>
        </div>
        <small id="email-form-message" class="d-flex mr-auto px-3 mt-1 d-none">알맞은 이메일 형식을 입력해 주세요.</small>
      </div>
      <div class="input-control js-input-control">
        <label for="name" class="input-label" hidden>이름</label>
        <input
          type="text"
          id="name"
          name="name"
          class="input-field"
          placeholder="이름"
          required
        />
        <small id="name-fail-message"  class="d-flex mr-auto px-3 mt-1 d-none">공백을 제거해 주세요.</small>
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
      <div class="input-control js-input-control">
        <label for="password-confirm" class="input-label" hidden
          >비밀번호 확인</label
        >
        <input
          type="password"
          id="password-confirm"
          name="password-confirm"
          class="input-field"
          placeholder="비밀번호 확인"
          required
        />
        <small id="password-confirm-fail-message" class="d-flex mr-auto px-3 mt-1 d-none">동일한 비밀번호를 입력해 주세요.</small>
      </div>
      <div class="input-control">
        <button
          type="submit"
          name="submit"
          id="signup-button"
          class="input-submit w-100 bg-cyan-300"
        >
          확인
        </button>
      </div>
      <p class="text-gray-700 pl-2">
        회원이신가요?
        <a id="login" href="${PATH.ROOT}">로그인</a>
      </p>
    </form>
  </div>`;

export default signupTemplate;
