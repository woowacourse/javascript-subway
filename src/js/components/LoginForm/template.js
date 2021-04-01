import subwayEmoji from '../../../images/subway_emoji.png';

export default `
  <div class="wrapper p-10 bg-white">
    <div class="heading">
      <h2 class="text-center">👋 로그인</h2>
      <p id="app-description" class="mt-0 text-center">
      지하철 노선도 앱을 사용하기 위해서는 로그인이 필요합니다.
      </p>
      <div>
        <div class="d-flex justify-center">
          <img src="${subwayEmoji}" alt="subway-emoji" width="200" />
        </div>
      </div>
    </div>
    <form id="login-form" name="login" class="form">
      <div class="input-control">
        <label for="email" class="input-label" hidden>이메일</label>
        <input type="email" id="email" name="email" class="input-field" placeholder="이메일" required />
      </div>
      <div class="input-control flex-col">
        <label for="password" class="input-label" hidden>비밀번호</label>
        <input type="password" id="password" name="password" class="input-field box-border"
          placeholder="비밀번호" />
        <p id="login-error-warning" class="text-xs text-red w-100 ml-5 my-1 d-none">아이디, 패스워드를 확인하세요.</p>
      </div>
      <div class="input-control w-100">
        <button type="submit" name="submit" id="login-submit" class="input-submit w-100 bg-cyan-300">
          확인
        </button>
      </div>
      <p class="text-gray-700 pl-2">
        아직 회원이 아니신가요?
        <a id="signup" href="/signup">회원가입</a>
      </p>
    </form>
  </div>
`;
