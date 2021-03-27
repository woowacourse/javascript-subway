import { PATHNAMES } from '../../../constants/index.js';

const LOGIN_TEMPLATE = `<div class="wrapper p-10 bg-white">
<div class="heading">
  <h2>👋 로그인</h2>
</div>
<form name="login" class="form">
  <div class="auth-input-control">
    <label for="email" class="auth-input-label">이메일</label>
    <input type="email" id="email" name="email" class="auth-input-field" placeholder="365kim@gmail.com" required />
    <span></span>
  </div>
  <div class="auth-input-control">
    <label for="password" class="auth-input-label">비밀번호</label>
    <input type="password" id="password" name="password" class="auth-input-field" placeholder="365" required />
    <span></span>
  </div>
  <div class="d-flex flex-col justify-center items-center mt-9">
    <button type="submit" name="submit" class="auth-submit-button w-100 bg-cyan-300" disabled>확인</button>
    <p class="text-gray-700 mt-4">
      아직 회원이 아니신가요?
      <a href="${PATHNAMES.SIGN_UP}">회원가입</a>
    </p>
  </div>
</form>
</div>`;

export default LOGIN_TEMPLATE;
