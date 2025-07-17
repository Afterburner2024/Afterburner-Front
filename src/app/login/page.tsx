"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Github, Mail, MessageSquare } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoggedIn } = useAuth();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  // 이미 로그인된 상태면 홈으로 리다이렉트
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(provider);

    // 로딩 효과를 위한 지연
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // TODO: 실제 소셜 로그인 API 연동
    console.log(`Logging in with ${provider}`);

    // 임시 사용자 데이터 생성
    const mockUserData = {
      id: `user_${Date.now()}`,
      name:
        provider === "github"
          ? "GitHub User"
          : provider === "google"
          ? "Google User"
          : "Discord User",
      email: `user@${provider}.com`,
      provider: provider,
      avatar: undefined,
    };

    // 로그인 처리
    login(mockUserData);

    // 홈으로 리다이렉트
    router.push("/");
  };

  const socialProviders = [
    {
      id: "github",
      name: "GitHub",
      icon: Github,
      bgColor: "bg-gray-900 hover:bg-gray-800",
      textColor: "text-white",
      description: "GitHub 계정으로 로그인",
    },
    {
      id: "google",
      name: "Google",
      icon: Mail,
      bgColor: "bg-red-500 hover:bg-red-600",
      textColor: "text-white",
      description: "Google 계정으로 로그인",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0a0a0a] px-4">
      <div className="w-full max-w-md">
        {/* 로고 및 타이틀 */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Image
              src="/images/afterburner-logo-dark.png"
              alt="Afterburner Logo"
              width={200}
              height={200}
              className="dark:hidden"
            />
            <Image
              src="/images/afterburner-logo.png"
              alt="Afterburner Logo"
              width={200}
              height={200}
              className="hidden dark:block"
            />
          </div>
          <p className="text-gray-600 dark:text-[#a0a0a0]">
            프로젝트 팀원 모집 플랫폼
          </p>
        </div>

        {/* 로그인 카드 */}
        <Card className="p-6 bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#333333]">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              로그인
            </h2>
            <p className="text-sm text-gray-600 dark:text-[#a0a0a0]">
              소셜 계정으로 간편하게 시작하세요
            </p>
          </div>

          {/* 소셜 로그인 버튼들 */}
          <div className="space-y-4">
            {socialProviders.map((provider) => (
              <Button
                key={provider.id}
                onClick={() => handleSocialLogin(provider.id)}
                disabled={isLoading !== null}
                className={`w-full h-12 ${provider.bgColor} ${provider.textColor} transition-all duration-200 relative`}
                variant="outline"
              >
                <div className="flex items-center justify-center gap-3">
                  <provider.icon className="w-5 h-5" />
                  <span className="font-medium">
                    {isLoading === provider.id
                      ? "로그인 중..."
                      : provider.description}
                  </span>
                </div>

                {/* 로딩 스피너 */}
                {isLoading === provider.id && (
                  <div className="absolute right-4">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </Button>
            ))}
          </div>

          <Separator className="my-6" />
        </Card>

        {/* 하단 텍스트 */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500 dark:text-[#666666]">
            로그인하면 Afterburner의{" "}
            <span className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
              이용약관
            </span>{" "}
            및{" "}
            <span className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
              개인정보처리방침
            </span>
            에 동의하는 것으로 간주됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}
