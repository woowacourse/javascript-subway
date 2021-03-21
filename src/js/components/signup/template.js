export const signupTemplate = () => {
  return `
    <div class="signup-container container wrapper p-10 bg-white">
        <div class="heading">
          <h2 class="text">📝 회원가입</h2>
        </div>
        <form name="signup" id="signup-form">
        <div class="input-control">
            <label for="signup-name" class="input-label" hidden>이름</label>
            <input
              type="text"
              id="signup-name"
              name="signup-name"
              class="input-field"
              placeholder="이름"
              autocomplete="off"
              required
            />
          </div>
          <div class="input-control">
            <label for="signup-email" class="input-label" hidden>이메일</label>
            <input
              type="email"
              id="signup-email"
              name="signup-email"
              class="input-field"
              placeholder="이메일"
              autocomplete="off"
              required
            />
          </div>
          <div class="input-control">
            <label for="signup-password" class="input-label" hidden
              >비밀번호</label
            >
            <input
              type="password"
              id="signup-password"
              name="signup-password"
              class="input-field"
              placeholder="비밀번호"
              autocomplete="off"
            />
          </div>
          <div class="input-control">
            <label for="signup-password-confirm" class="input-label" hidden
              >비밀번호 확인</label
            >
            <input
              type="password"
              id="signup-password-confirm"
              name="signup-password-confirm"
              class="input-field"
              placeholder="비밀번호 확인"
              autocomplete="off"
            />
          </div>
          <div class="input-control">
            <button
              name="submit"
              class="input-submit w-100 bg-cyan-300"
            >
              확인
            </button>
          </div>
        </form>
      </div>`;
};
