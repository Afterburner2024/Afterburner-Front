"use client";

import { ReactNode, useState } from "react";
import { Header } from "@/components/header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SideNav } from "@/components/side-nav";
import { Footer } from "@/components/footer";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="flex min-h-svh flex-col">
      <Header onMobileMenuOpen={() => setIsMobileMenuOpen(true)} />
      <div className="flex flex-1">
        {/* 데스크톱 사이드바 */}
        <aside className="hidden w-[240px] border-r md:block">
          <ScrollArea className="h-[calc(100svh-7rem)] py-6 pr-4 lg:py-8">
            <SideNav />
          </ScrollArea>
        </aside>

        {/* 모바일 메뉴 */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetContent side="left" className="w-[240px] p-0">
            <SheetHeader className="p-4 border-b">
              <SheetTitle>내비게이션</SheetTitle>
              <SheetDescription>
                페이지를 탐색할 수 있는 메뉴입니다.
              </SheetDescription>
            </SheetHeader>
            <ScrollArea className="h-[calc(100%-80px)] py-6 pr-4">
              <SideNav onItemClick={closeMobileMenu} />
            </ScrollArea>
          </SheetContent>
        </Sheet>

        <main className="flex-1">
          <ScrollArea className="h-[calc(100svh-7rem)]">
            <div className="p-4 h-full">{children}</div>
          </ScrollArea>
        </main>
      </div>
      <Footer />
    </div>
  );
}
