export const getHomeInfo = (data = {}) => {
  return {
    title: '🚇 지하철 APP',
    contents: {
      main: homeTemplate(),
    },
  };
};

const homeTemplate = () => {
  return `
  <div class="wrapper bg-white p-10">
    처음렌더링
    <div class="heading d-flex">

    </div>
  </div>
  `;
};
