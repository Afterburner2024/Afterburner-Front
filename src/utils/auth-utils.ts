import { cookies } from "next/headers";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  provider: string;
}

const COOKIE_NAME = "afterburner_user";

/**
 * 서버 사이드에서 쿠키로부터 사용자 정보를 가져옵니다.
 */
export async function getUserFromCookies(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const userCookie = cookieStore.get(COOKIE_NAME);

    if (!userCookie?.value) {
      return null;
    }

    const userData = JSON.parse(userCookie.value);
    return userData as User;
  } catch (error) {
    console.error("Failed to parse user data from server-side cookie:", error);
    return null;
  }
}

/**
 * 서버 사이드에서 로그인 상태를 확인합니다.
 */
export async function isLoggedInServer(): Promise<boolean> {
  const user = await getUserFromCookies();
  return user !== null;
}
