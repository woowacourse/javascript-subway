import PAGE_URLS from "./pages.js";

// eslint-disable-next-line import/prefer-default-export
export const NAV_ITEMS = [
  {
    title: "🚉 역 관리",
    href: PAGE_URLS.STATIONS,
  },
  {
    title: "🛤️ 노선 관리",
    href: PAGE_URLS.LINES,
  },
  {
    title: "🔁 구간 관리",
    href: PAGE_URLS.SECTIONS,
  },
  {
    title: "🗺️ 전체 보기",
    href: PAGE_URLS.MAP,
  },
  {
    title: "🔎 길 찾기",
    href: PAGE_URLS.SEARCH,
  },
];
