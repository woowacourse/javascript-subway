import { linkButton } from '../../../@shared/views/linkButton';

const navButtonInfos = [
  { link: '#stations', text: '🚉 역 관리' },
  { link: '#lines', text: '🛤️ 노선 관리' },
  { link: '#sections', text: '🔁 구간 관리' },
  { link: '#map', text: '🗺️ 전체 보기' },
  { link: '#search', text: '🔎 길 찾기' },
];

export const header = `
<a href="/" class="text-black">
  <h1 class="text-center font-bold">🚇 지하철 노선도</h1>
</a>
<nav class="d-flex justify-center flex-wrap">
  ${navButtonInfos.map(linkButton).join('')}
</nav>
`;
