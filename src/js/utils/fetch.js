import { ALERT_MESSAGE } from "../constants.js";

export const fetchSignup = async (url, option) => {
  const response = await fetch(url, option);
  if (response.status === 400) {
    throw new Error(ALERT_MESSAGE.DUPLICATED_EMAIL_FAIL);
  }

  // TODO: 매직 넘버, 메시지 상수화
  if (response.status === 500) {
    throw new Error("회원 가입에 실패했습니다.");
  }

  if (!response.ok) {
    throw new Error(response.status);
  }
}
