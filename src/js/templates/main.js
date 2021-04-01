export const getMainTemplate = (isSignIn) => {
  return `
  <div class="d-flex flex-col">
    <div class="d-flex justify-center">
      <img src="../images/subway_emoji.png" width="200" />
    </div>
    <p class="mt-0 text-center">${
      isSignIn ? '🙇🏻 환영합니다 🙇🏻‍♀️' : '지하철 노선도 앱을 사용하기 위해서는 로그인이 필요합니다.'
    }</p>
  </div>
`;
};
