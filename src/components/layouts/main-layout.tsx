import { ReactNode } from "react";
import { Header } from "@/components/header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SideNav } from "@/components/side-nav";
import { Footer } from "@/components/footer";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <aside className="hidden w-[240px] border-r md:block">
          <ScrollArea className="h-[calc(100vh-7rem)] py-6 pr-4 lg:py-8">
            <SideNav />
          </ScrollArea>
        </aside>
        <main className="flex-1">
          <ScrollArea className="h-[calc(100vh-7rem)]">
            <div className="p-4 h-full">{children}</div>
          </ScrollArea>
        </main>
      </div>
      <Footer />
    </div>
  );
}
