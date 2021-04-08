const mainTemplate = () => {
  return `
    <div class="wrapper p-10 bg-white">
      <div class="heading">
        <h2 class="text">🧡 회원가입</h2>
      </div>
      <form
        id="signup-form"
        name="signup"
        class="form">
        <div class="input-control">
          <label for="name" class="input-label" hidden>이름</label>
          <input
            type="text"
            id="name"
            name="name"
            class="input-field"
            placeholder="이름"
            minlength="2"
            maxlength=20
            autofocus
            required
          />
        </div>
        <div class="js-name-check form__input-check"></div>
        <div class="input-control">
          <label for="email" class="input-label" hidden>이메일</label>
          <input
            type="email"
            id="email"
            name="email"
            class="input-field"
            placeholder="이메일"
            maxlength=40
            required
          />
        </div>
        <div class="js-email-check form__input-check"></div>
        <div class="input-control">
          <label for="password" class="input-label" hidden>비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            class="input-field"
            placeholder="비밀번호"
            minlength="6"
            maxlength=20
            required
          />
        </div>
        <div class="form__input-check"></div>
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
            minlength="6"
            maxlength=20
            required
          />
        </div>
        <div class="js-password-check form__input-check"></div>
        <div class="input-control">
          <button
            name="submit"
            class="input-submit w-100 bg-custom-pink"
          >
            확인
          </button>
        </div>
      </form>
    </div>
  `;
};

export default mainTemplate;
