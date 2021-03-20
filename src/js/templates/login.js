const loginTemplate = `
  <div class="d-flex justify-center mt-5 w-100">
    <div class="w-100">
      <header class="my-4"></header>
      <main id="login-container" class="mt-10 d-flex justify-center">
        <div class="wrapper p-10 bg-white">
          <div class="heading">
            <h2>👋 로그인</h2>
          </div>
          <form name="login" id="login-form" class="form">
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
            </div>
            <div class="input-control">
              <label for="password" class="input-label" hidden>비밀번호</label>
              <input
                type="password"
                id="password"
                name="password"
                class="input-field"
                placeholder="비밀번호"
                required
              />
            </div>
            <div class="input-control w-100">
              <button
                type="submit"
                name="submit"
                id="submit-button"
                class="input-submit w-100 bg-cyan-300"
              >
                확인
              </button>
            </div>
            <div class="input-control">
              <label><input type="checkbox" name="keep-login" />로그인 상태 유지</label>
            </div>
            <p class="text-gray-700 pl-2">
              아직 회원이 아니신가요?
              <a href="/signup" id="signup-link" class="js-link">회원가입</a>
            </p>
          </form>
        </div>
      </main>
    </div>
  </div>
`;

export default loginTemplate;
