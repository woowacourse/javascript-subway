export const getSignUpTemplate = () => `
  <div class="wrapper p-10 bg-white">
    <div class="heading">
      <h2 class="text">📝 회원가입</h2>
    </div>
    <form name="signup" class="signup-form form">
      <div class="input-control">
        <div class= "input-inner"> 
          <label for="email" class="input-label" hidden>이메일</label>
          <input
            type="email"
            id="email"
            name="email"
            class="signup-form__email-input input-field"
            placeholder="이메일"
            required
          />
          <div class="signup-form__email-check-text-area input-check-text"></div>
        </div>
      </div>
      <div class="input-control">
        <div class= "input-inner"> 
          <label for="user-name" class="input-label" hidden>이름</label>
          <input
            id="user-name"
            name="user-name"
            class="signup-form__user-name-input input-field"
            placeholder="이름"
            required
          />
          <div class="signup-form__user-name-check-text-area input-check-text"></div>
        </div>
      </div>
      <div class="input-control">
        <div class= "input-inner"> 
          <label for="password" class="input-label" hidden>비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            class="signup-form__password-input input-field"
            placeholder="비밀번호"
            required
          />
          <div class="signup-form__password-check-text-area input-check-text"></div>
        </div>
      </div>
      <div class="input-control">
        <div class= "input-inner"> 
          <label for="password-confirm" class="input-label" hidden>비밀번호 확인</label>
          <input
            type="password"
            id="password-confirm"
            name="password-confirm"
            class="signup-form__password-confirm-input input-field"
            placeholder="비밀번호 확인"
            required
          />
          <div class="signup-form__password-confirm-check-text-area input-check-text"></div>
        </div>
      </div>
      <div class="input-control">
        <button type="submit" name="submit" class="signup-form__submit-button input-submit w-100 bg-cyan-300">
          확인
        </button>
      </div>
    </form>
  </div>
`;
