import { linkButton } from '../../../@shared/views/templates/linkButton';

const navButtonInfos = [
  { link: '#stations', text: '🚉 역 관리' },
  { link: '#lines', text: '🛤️ 노선 관리' },
  { link: '#sections', text: '🔁 구간 관리' },
  { link: '#map', text: '🗺️ 전체 보기' },
  { link: '#search', text: '🔎 길 찾기' },
];

export const menuButtons = `
<nav class="d-flex justify-center flex-wrap">
  ${navButtonInfos.map(linkButton).join('')}
</nav>
`;
