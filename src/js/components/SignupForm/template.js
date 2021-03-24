export default `
  <div class="wrapper p-10 bg-white">
    <div class="heading">
      <h2 class="text">📝 회원가입</h2>
    </div>
    <form id="signup-form" name="signup" class="form">
      <div class="input-control flex-col">
        <div class="d-flex w-100">
          <label for="email" class="input-label" hidden>이메일</label>
          <input type="email" id="email" name="email" class="input-field box-border" placeholder="이메일"
            required autofocus/>
        </div>
        <p id="email-input-error" class="text-xs text-red w-100 ml-10 my-1 d-none">중복된 이메일이 존재합니다.</p>
        <p id="email-input-correct" class="text-xs text-green w-100 ml-10 my-1 d-none">이메일을 사용할 수 있습니다.</p>
      </div>
      <div class="input-control flex-col">
        <label for="name" class="input-label" hidden>이름</label>
        <input type="text" id="name" name="name" class="input-field box-border" placeholder="이름" required />
      </div>
      <div class="input-control flex-col">
        <label for="password" class="input-label" hidden>비밀번호</label>
        <input type="password" id="password" name="password" class="input-field box-border" placeholder="비밀번호"
          required />
      </div>
      <div class="input-control flex-col">
        <label for="password-confirm" class="input-label" hidden>비밀번호 확인</label>
        <input type="password" id="password-confirm" name="password-confirm" class="input-field box-border"
          placeholder="비밀번호 확인" required />
        <p id="password-confirm-error" class="text-xs text-red w-100 ml-10 my-1 d-none">비밀번호가 일치하지 않습니다.</p>
        <p id="password-confirm-correct" class="text-xs text-green w-100 ml-10 my-1 d-none">비밀번호가 일치합니다.</p>
      </div>
      <div class="input-control">
        <button type="submit" id="signup-submit-button" name="submit" class="input-submit w-100 bg-cyan-300">
          확인
        </button>
      </div>
    </form>
  </div>
`;
