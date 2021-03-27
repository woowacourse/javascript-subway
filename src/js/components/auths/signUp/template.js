const SIGN_UP_TEMPLATE = `
<div class="wrapper p-10 bg-white">
  <div class="heading">
    <h2 class="text">📝 회원가입</h2>
  </div>
  <form name="sign-up" class="form">
    <div class="auth-input-control">
      <label for="name" class="auth-input-label">이름</label>
      <input type="text" id="name" name="name" class="auth-input-field" placeholder="홍길동" required />
      <span></span>
      <div class="validation-message name-validation-message v-hidden"></div>
    </div>
    <div class="auth-input-control">
      <label for="email" class="auth-input-label">이메일</label>
      <input type="email" id="email" name="email" class="auth-input-field" placeholder="woowa@email.com" required />
      <span></span>
      <div class="validation-message email-validation-message v-hidden"></div>
    </div>
    <div class="auth-input-control">
      <label for="password" class="auth-input-label">비밀번호</label>
      <input type="password" id="password" name="password" class="auth-input-field" placeholder="****" required />
      <span></span>
      <div class="validation-message password-validation-message v-hidden"></div>
    </div>
    <div class="d-flex my-3 mx-5 justify-end items-center">
      <label>비밀번호 표시</label>
      <input type="checkbox" id="password-checkbox"></input>
    </div>
    <div class="d-flex flex-col justify-center items-center mt-9">
      <button type="submit" name="submit" class="auth-submit-button w-100 bg-cyan-300" disabled>확인</button>
    </div>
  </form>
</div>`;

export default SIGN_UP_TEMPLATE;
