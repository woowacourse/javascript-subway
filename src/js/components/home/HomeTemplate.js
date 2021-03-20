export const homeTemplate = isLoggedIn => {
  return `
    <div class="wrapper bg-white p-10">
      처음렌더링
      <div class="heading d-flex">
        ${isLoggedIn ? '메뉴를 선택해주세요' : '로그인을 해주세요'}
      </div>
    </div>
    `;
};
