import tomas from '../../../images/tomas.png';

const mainTemplate = () => {
  return `
    <div class="wrapper p-10 bg-white">
      <div class="heading">
        <h2 class="mb-0">👋 로그인</h2>
      </div>
      <div class="d-flex flex-col mb-1">
        <div class="d-flex justify-center">
          <img src=${tomas} width="150" />
        </div>
        <p class="mt-2 text-center">
          지하철 노선도 앱을 사용하기 위해서는 <br/> 로그인이 필요합니다.
        </p>
      </div>
      <form
        id="login-form"
        name="login"
        class="form"
      >
        <div class="input-control">
          <label for="email" class="input-label" hidden>이메일</label>
          <input
            type="email"
            id="email"
            name="email"
            class="input-field"
            placeholder="이메일"
            maxlength=40
            autofocus
            autocomplete
            required
          />
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
            minlength=6
            maxlength=20
            autocomplete
            required
          />
        </div>
        <div class="js-login-check form__input-check"></div>
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
          <a href="/signup" class="js-link">회원가입</a>
        </p>
      </form>
    </div>
  `;
};

export default mainTemplate;
