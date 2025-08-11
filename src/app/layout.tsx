import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/auth-context";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Afterburner",
  description:
    "국비교육 수료 개발자들을 위한 팀원 모집 플랫폼 - 함께할 팀원을 찾거나 프로젝트에 참여해보세요",
  keywords: [
    "개발자",
    "팀원모집",
    "프로젝트",
    "스터디",
    "국비교육",
    "개발자커뮤니티",
  ],
  authors: [{ name: "Afterburner Team" }],
  creator: "Afterburner",
  publisher: "Afterburner",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  ),
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/",
    title: "Afterburner - 국비교육 수료 개발자들을 위한 팀원 모집 플랫폼",
    description:
      "국비교육 수료 개발자들을 위한 팀원 모집 플랫폼 - 함께할 팀원을 찾거나 프로젝트에 참여해보세요",
    siteName: "Afterburner",
    images: [
      {
        url: "/images/main-bg-1.webp",
        width: 1200,
        height: 630,
        alt: "Afterburner - 개발자 팀원 모집 플랫폼",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Afterburner - 국비교육 수료 개발자들을 위한 팀원 모집 플랫폼",
    description:
      "국비교육 수료 개발자들을 위한 팀원 모집 플랫폼 - 함께할 팀원을 찾거나 프로젝트에 참여해보세요",
    images: ["/images/main-bg-1.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION_CODE,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          inter.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <ProtectedRoute>
              {children}
              <Toaster />
            </ProtectedRoute>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
