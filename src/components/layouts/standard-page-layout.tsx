import { ReactNode } from "react";
import { MainLayout } from "./main-layout";

interface StandardPageLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
}

export function StandardPageLayout({
  title,
  description,
  children,
  className = "",
  headerClassName = "",
  contentClassName = "",
}: StandardPageLayoutProps) {
  return (
    <MainLayout>
      <div className={`min-h-svh bg-gray-50 dark:bg-[#171515] ${className}`}>
        <div className="flex flex-col space-y-10 p-6">
          {/* 표준 헤더 섹션 */}
          <section
            className={`flex flex-col items-center space-y-6 pt-4 ${headerClassName}`}
          >
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-[#ffa500] text-center">
              {title}
            </h1>
            {description && (
              <p className="text-gray-600 dark:text-[#a0a0a0] max-w-2xl text-center">
                {description}
              </p>
            )}
          </section>

          {/* 컨텐츠 섹션 */}
          <section className={`w-full max-w-7xl mx-auto ${contentClassName}`}>
            {children}
          </section>
        </div>
      </div>
    </MainLayout>
  );
}
