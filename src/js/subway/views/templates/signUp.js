export const signUp = `
<main class="mt-10 d-flex justify-center">
  <div class="wrapper p-10 bg-white">
    <div class="heading">
      <h2 class="text">📝 회원가입</h2>
    </div>
    <form name="login" class="form">
      <div class="input-control">
        <label for="email" class="input-label" hidden>이메일</label>
        <input
          type="email"
          id="signup-email"
          name="email"
          class="input-field"
          placeholder="이메일"
          required
        />
        <div class="js-message-box hidden">유효하지 않은 이메일입니다.</div>
      </div>
      <div class="input-control">
        <label for="name" class="input-label" hidden>이메일</label>
        <input
          type="text"
          id="signup-name"
          name="name"
          class="input-field"
          placeholder="이름"
          required
        />
        <div class="js-message-box hidden">유효하지 않은 이름입니다.</div>
      </div>
      <div class="input-control">
        <label for="password" class="input-label" hidden
          >비밀번호</label
        >
        <input
          type="password"
          id="signup-password"
          name="password"
          class="input-field"
          placeholder="비밀번호"
        />
        <div class="js-message-box hidden">유효하지 않은 패스워드입니다.</div>
      </div>
      <div class="input-control">
        <label for="password-confirm" class="input-label" hidden
          >비밀번호 확인</label
        >
        <input
          type="password"
          id="signup-password-confirm"
          name="password-confirm"
          class="input-field"
          placeholder="비밀번호 확인"
        />
        <div class="js-message-box hidden">패스워드가 일치하지 않습니다.</div>
      </div>
      <div class="input-control">
        <button
          type="button"
          id="signup-button"
          name="submit"
          class="input-submit w-100 bg-cyan-300"
          disabled
        >
          확인
        </button>
      </div>
    </form>
  </div>
</main>
`;
