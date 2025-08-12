"use client";

import { MainLayout } from "@/components/layouts/main-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Rocket, Users, BookOpen, TrendingUp } from "lucide-react";
import Link from "next/link";
import { TechArticleCard } from "@/components/home/tech-article-card";
import { NewsArticleCard } from "@/components/home/news-article-card";
import { TechTrends } from "@/components/home/tech-trends";
import { MonthlyDevelopers } from "@/components/home/monthly-developers";
import { RecruitmentGrid } from "@/components/recruitment/recruitment-grid";
import {
  techArticles,
  techTrends,
  monthlyDevelopers,
  mockPosts,
} from "@/data/mockData";
import { applyDynamicStatusToPosts } from "@/utils/statusUtils";
import { useMemo } from "react";
import { Reveal } from "@/components/ui/reveal";
import { CountUp } from "@/components/ui/count-up";

export default function Home() {
  // 동적 상태가 적용된 게시글
  const postsWithDynamicStatus = useMemo(() => {
    return applyDynamicStatusToPosts(mockPosts);
  }, []);

  // 인기 프로젝트/스터디 (최근 생성된 4개)
  const popularPosts = postsWithDynamicStatus
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 4);

  const projectCount = mockPosts.filter((p) => p.type === "project").length;
  const studyCount = mockPosts.filter((p) => p.type === "study").length;

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-[#171515]">
        {/* 히어로 섹션 */}
        <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 dark:from-blue-800 dark:via-purple-800 dark:to-blue-900">
          <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />
          <div className="relative max-w-7xl mx-auto px-6 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* 좌측: 메인 카피 */}
              <div className="space-y-8">
                <Reveal as="div" className="space-y-4">
                  <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight">
                    <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
                      국비교육 수료
                      <br />
                      개발자들을 위한
                    </span>
                    <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-400 drop-shadow-sm">
                      팀원 모집
                    </span>{" "}
                    <span className="text-white">플랫폼</span>
                  </h1>
                  <p className="text-lg lg:text-xl text-blue-100 leading-relaxed">
                    함께할 팀원을 찾거나 프로젝트에 참여해보세요.
                    <br />
                    최신 기술 트렌드와 함께 성장하는 개발자 커뮤니티입니다.
                  </p>
                </Reveal>

                {/* 통계 */}
                <div className="grid grid-cols-3 gap-8">
                  <Reveal as="div" className="text-center" delayMs={50}>
                    <div className="text-3xl font-bold text-yellow-400">
                      <CountUp value={projectCount} />
                    </div>
                    <div className="text-blue-100 text-sm">
                      진행중인 프로젝트
                    </div>
                  </Reveal>
                  <Reveal as="div" className="text-center" delayMs={120}>
                    <div className="text-3xl font-bold text-yellow-400">
                      <CountUp value={studyCount} />
                    </div>
                    <div className="text-blue-100 text-sm">활성 스터디</div>
                  </Reveal>
                  <Reveal as="div" className="text-center" delayMs={180}>
                    <div className="text-3xl font-bold text-yellow-400">
                      <CountUp value={1234} />
                    </div>
                    <div className="text-blue-100 text-sm">등록된 개발자</div>
                  </Reveal>
                </div>

                {/* CTA 버튼 */}
                <Reveal
                  as="div"
                  className="flex flex-col sm:flex-row gap-4"
                  delayMs={220}
                >
                  <Button
                    asChild
                    variant="outline"
                    size="xl"
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold shadow-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                  >
                    <Link
                      href="/recruitment"
                      aria-label="팀원 모집 페이지로 이동"
                      className="flex items-center gap-2"
                    >
                      <Users className="w-5 h-5" />
                      팀원 모집하기
                    </Link>
                  </Button>
                </Reveal>
              </div>

              {/* 우측: 최신 기술 컬럼 */}
              <Reveal as="div" className="space-y-6" delayMs={120}>
                <div className="flex items-center gap-2 text-white">
                  <TrendingUp className="w-5 h-5" />
                  <h2 className="text-xl font-bold">최신 기술 컬럼</h2>
                </div>
                <div className="space-y-2">
                  {techArticles.slice(0, 2).map((article, idx) => (
                    <Reveal key={article.id} delayMs={160 + idx * 80}>
                      <NewsArticleCard article={article} variant="compact" />
                    </Reveal>
                  ))}
                </div>
                <div className="mt-2"></div>
                <Reveal as="div" delayMs={260}>
                  <Link
                    href="/tech-articles"
                    className="w-full"
                    aria-label="기술 컬럼 더 보기"
                  >
                    <Button
                      variant="outline"
                      className="w-full border-white text-white hover:bg-white hover:text-blue-600"
                    >
                      더 많은 컬럼 보기
                    </Button>
                  </Link>
                </Reveal>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 메인 컨텐츠 */}
        <section className="max-w-7xl mx-auto px-6 py-24 space-y-20">
          {/* 인기 프로젝트/스터디 */}
          <div className="space-y-10">
            <Reveal as="div" className="text-center space-y-4">
              <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                🔥 인기 모집글
              </h2>
              <p className="text-gray-600 dark:text-[#a0a0a0] text-base lg:text-lg max-w-2xl mx-auto">
                최근 주목받고 있는 프로젝트와 스터디를 확인해보세요
              </p>
            </Reveal>
            <Reveal>
              <RecruitmentGrid posts={popularPosts} />
            </Reveal>
            <Reveal as="div" className="text-center" delayMs={80}>
              <Button asChild size="lg" variant="outline">
                <Link
                  href="/recruitment"
                  className="flex items-center gap-2"
                  aria-label="모집글 더 보기"
                >
                  더 많은 모집글 보기
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </Reveal>
          </div>

          {/* 기술 트렌드 & 이달의 개발자 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <Reveal>
              <TechTrends trends={techTrends} />
            </Reveal>
            <Reveal delayMs={100}>
              <MonthlyDevelopers developers={monthlyDevelopers} />
            </Reveal>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
