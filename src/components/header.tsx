"use client";

import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, Menu } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface HeaderProps {
  onMobileMenuOpen?: () => void;
}

export function Header({ onMobileMenuOpen }: HeaderProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 더 안전한 로고 경로 설정
  const logoSrc = mounted
    ? theme === "dark"
      ? "/images/afterburner-logo.png"
      : "/images/afterburner-logo-dark.png"
    : "/images/afterburner-logo-dark.png"; // 기본값

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          {/* 모바일 메뉴 버튼 */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onMobileMenuOpen}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">메뉴 열기</span>
          </Button>

          <Link href="/" className="font-semibold">
            <Image
              src={logoSrc}
              alt="Afterburner"
              width={120}
              height={24}
              className="h-6 w-auto"
              priority
              onError={(e) => {
                // 이미지 로드 실패 시 기본 이미지로 대체
                const target = e.target as HTMLImageElement;
                target.src = "/images/afterburner-logo-dark.png";
              }}
            />
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button variant="ghost" size="icon" className="rounded-full" asChild>
            <Link href="#">
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
