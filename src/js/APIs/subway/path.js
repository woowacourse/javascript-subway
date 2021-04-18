export const END_POINT = "https://www.boorownie.com";

export const PATH = {
  SIGNUP: "/members",
  MEMBER_INFO: "/members/me",
  LOGIN: "/login/token",
  CHECK_DUPLICATED_EMAIL: "/members/check-validation",
  STATIONS: (id = "") => `/stations/${id}`,
  LINES: (id = "") => `/lines/${id}`,
  SECTIONS: (id = "") => `/lines/${id}/sections`,
};
