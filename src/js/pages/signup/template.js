const signupTemplate = `
  <div class="d-flex justify-center mt-5 w-100">
    <div class="w-100">
      <header class="my-4"></header>
      <main id="signup-container" class="mt-10 d-flex justify-center">
        <div class="wrapper p-10 bg-white">
          <div class="heading">
            <h2 class="text">📝 회원가입</h2>
          </div>
          <form name="signup" id="signup-form" class="form">
            <div class="input-control">
              <label for="email" class="input-label" hidden>이메일</label>
              <input
                type="email"
                id="email"
                name="email"
                class="input-field"
                placeholder="이메일"
                required
              />
              <span id="email-check-message" class="input-check-hint"></span>
            </div>
            <div class="input-control">
              <label for="password" class="input-label" hidden
                >비밀번호</label
              >
              <input
                type="password"
                id="password"
                name="password"
                class="input-field"
                placeholder="비밀번호"
                required
              />
            </div>
            <div class="input-control">
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
            </div>
            <div class="input-control">
              <label for="name" class="input-label" hidden
                >이름</label
              >
              <input
                type="text"
                id="name"
                name="name"
                class="input-field"
                placeholder="이름"
                required
              />
            </div>
            <div class="input-control">
              <button
                id="submit-button"
                name="submit"
                class="input-submit w-100 bg-cyan-300"
                disabled
              >
                확인
              </button>
            </div>
            <div class="input-control">
              <a href="/login" id="login-link" class="js-link">
                로그인하러 가기
              </a>
            </div>
          </form>
        </div>
      </main>
    </div>
  </div>
`;

export default signupTemplate;
