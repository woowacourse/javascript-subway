export const loginTemplate = () => {
  return `<div class="login-container container wrapper p-10 bg-white">
              <div class="heading">
                <h2>👋 로그인</h2>
              </div>
              <form name="login" id="login-form">
                <div class="input-control">
                  <label for="login-email" class="input-label" hidden>이메일</label>
                  <input
                    type="email"
                    id="login-email"
                    name="login-email"
                    class="input-field"
                    placeholder="이메일"
                    autocomplete="on"
                    required
                  />
                </div>
                <div class="input-control">
                  <label for="login-password" class="input-label" hidden
                    >비밀번호</label
                  >
                  <input
                    type="password"
                    id="login-password"
                    name="login-password"
                    class="input-field"
                    placeholder="비밀번호"
                    autocomplete="on"
                  />
                </div>
                <div class="input-control w-100">
                  <button
                    name="submit"
                    class="input-submit w-100 bg-cyan-300"
                  >
                    확인
                  </button>
                </div>
                <p class="text-gray-700 pl-2">
                  아직 회원이 아니신가요?
                  <a href="/signup" id="signup-button" class="navigation-link">회원가입</a>
                </p>
              </form>
           </div>`;
};
