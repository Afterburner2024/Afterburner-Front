"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoggedIn, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  // 공개 페이지 목록 (로그인 없이 접근 가능)
  const publicRoutes = ["/login"];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // 마운트되지 않았거나 로딩 중이면 아무것도 하지 않음
    if (!isMounted || isLoading) return;

    // 공개 페이지는 접근 허용
    if (publicRoutes.includes(pathname)) return;

    // 로그인하지 않은 사용자를 로그인 페이지로 리다이렉트
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, isLoading, pathname, router, isMounted]);

  // 하이드레이션 완료 전이거나 로딩 중 화면
  if (!isMounted || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0a0a0a]">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-[#a0a0a0]">로딩 중...</p>
        </div>
      </div>
    );
  }

  // 공개 페이지는 바로 렌더링
  if (publicRoutes.includes(pathname)) {
    return <>{children}</>;
  }

  // 로그인된 사용자만 페이지 렌더링
  if (isLoggedIn) {
    return <>{children}</>;
  }

  // 로그인하지 않은 사용자는 빈 화면 (리다이렉트 처리 중)
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0a0a0a]">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-[#a0a0a0]">
          로그인 페이지로 이동 중...
        </p>
      </div>
    </div>
  );
}
