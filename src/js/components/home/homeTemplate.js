export const homeTemplate = isLoggedIn => {
  return `
    <div class="wrapper bg-white p-10">
      <div class="heading d-flex justify-center">
        <div class="d-flex flex-col">
            <div class="d-flex justify-center">
            <img
                src="./3677884233af83d1fea37b0e4a40a883.png"
                width="200"
            />
            </div>
            <p class="mt-0 text-center">
            ${
              isLoggedIn
                ? '원하시는 메뉴를 선택해주세요'
                : '지하철 노선도 앱을 사용하기 위해서는 로그인이 필요합니다.'
            }
            </p>
        </div>
        
      </div>
    </div>
    `;
};
