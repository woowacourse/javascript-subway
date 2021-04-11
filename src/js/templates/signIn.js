export const getSignInTemplate = () => `
  <div class="wrapper p-10 bg-white">
    <div class="heading">
      <h2>👋 로그인</h2>
    </div>
    <form name="signin" class="sign-in-form form">
      <div class="input-control">
      <div class= "input-inner"> 
          <label for="email" class="input-label" hidden>이메일</label>
          <input
            type="email"
            id="email"
            name="email"
            class="signin-form__email-input input-field"
            placeholder="이메일"
            required
          />
          <div class="signin-form__email-check-text-area input-check-text"></div>
        </div>
      </div>
      <div class="input-control">
        <div class= "input-inner"> 
          <label for="password" class="input-label" hidden>비밀번호</label>
            <input
              type="password"
              id="password"
              name="password"
              class="signin-form__password-input input-field"
              placeholder="비밀번호"
            />
          <div class="signin-form__password-check-text-area input-check-text"></div>
        </div>
      </div>
      <div class="input-control w-100">
        <button type="submit" name="submit" class="signin-form__submit-button input-submit w-100 bg-cyan-300">
          확인
        </button>
      </div>
      <p class="text-gray-700 pl-2">
        아직 회원이 아니신가요?
        <a class="main__menu-router menu-link sign-up-button" href="/signup">회원가입</a>
      </p>
    </form>
  </div>
`;
