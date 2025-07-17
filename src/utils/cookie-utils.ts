import Cookies from "js-cookie";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  provider: string;
}

// 쿠키 설정
export const COOKIE_NAME = "afterburner_user";
export const COOKIE_OPTIONS = {
  expires: 7, // 7일 후 만료
  secure: process.env.NODE_ENV === "production", // 프로덕션에서만 HTTPS 필요
  sameSite: "lax" as const, // CSRF 보호
  httpOnly: false, // 클라이언트에서 접근 가능
};

/**
 * 클라이언트 사이드에서 사용자 정보를 쿠키에 저장합니다.
 */
export function setUserCookie(userData: User): void {
  try {
    Cookies.set(COOKIE_NAME, JSON.stringify(userData), COOKIE_OPTIONS);
  } catch (error) {
    console.error("Failed to set user cookie:", error);
  }
}

/**
 * 클라이언트 사이드에서 사용자 정보를 쿠키에서 가져옵니다.
 */
export function getUserCookie(): User | null {
  try {
    const userCookie = Cookies.get(COOKIE_NAME);
    if (!userCookie) {
      return null;
    }
    return JSON.parse(userCookie) as User;
  } catch (error) {
    console.error("Failed to get user cookie:", error);
    return null;
  }
}

/**
 * 클라이언트 사이드에서 사용자 쿠키를 제거합니다.
 */
export function removeUserCookie(): void {
  try {
    Cookies.remove(COOKIE_NAME);
  } catch (error) {
    console.error("Failed to remove user cookie:", error);
  }
}

/**
 * 클라이언트 사이드에서 로그인 상태를 확인합니다.
 */
export function isLoggedInClient(): boolean {
  return getUserCookie() !== null;
}
