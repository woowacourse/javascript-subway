import { PAGE_KEYS, PAGE_URLS } from "./pages.js";

// eslint-disable-next-line import/prefer-default-export
export const NAV_ITEMS = [
  {
    title: "🚉 역 관리",
    href: PAGE_URLS[PAGE_KEYS.STATIONS],
  },
  {
    title: "🛤️ 노선 관리",
    href: PAGE_URLS[PAGE_KEYS.LINES],
  },
  {
    title: "🔁 구간 관리",
    href: PAGE_URLS[PAGE_KEYS.SECTIONS],
  },
  {
    title: "🗺️ 전체 보기",
    href: PAGE_URLS[PAGE_KEYS.MAP],
  },
];
