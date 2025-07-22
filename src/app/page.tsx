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

export default function Home() {
  // 동적 상태가 적용된 게시글
  const postsWithDynamicStatus = useMemo(() => {
    return applyDynamicStatusToPosts(mockPosts);
  }, []);

  // 인기 프로젝트/스터디 (최근 생성된 6개)
  const popularPosts = postsWithDynamicStatus
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 6);

  const projectCount = mockPosts.filter((p) => p.type === "project").length;
  const studyCount = mockPosts.filter((p) => p.type === "study").length;

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-[#171515]">
        {/* 히어로 섹션 */}
        <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 dark:from-blue-800 dark:via-purple-800 dark:to-blue-900">
          <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />
          <div className="relative max-w-7xl mx-auto px-6 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* 좌측: 메인 카피 */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                    개발자들을 위한
                    <br />
                    <span className="text-yellow-400">팀원 모집</span> 플랫폼
                  </h1>
                  <p className="text-xl text-blue-100 leading-relaxed">
                    함께할 팀원을 찾거나 프로젝트에 참여해보세요.
                    <br />
                    최신 기술 트렌드와 함께 성장하는 개발자 커뮤니티입니다.
                  </p>
                </div>

                {/* 통계 */}
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400">
                      {projectCount}
                    </div>
                    <div className="text-blue-100 text-sm">
                      진행중인 프로젝트
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400">
                      {studyCount}
                    </div>
                    <div className="text-blue-100 text-sm">활성 스터디</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400">
                      1,234
                    </div>
                    <div className="text-blue-100 text-sm">등록된 개발자</div>
                  </div>
                </div>

                {/* CTA 버튼 */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
                  >
                    <Link
                      href="/recruitment"
                      className="flex items-center gap-2"
                    >
                      <Users className="w-5 h-5" />
                      팀원 모집하기
                    </Link>
                  </Button>
                </div>
              </div>

              {/* 우측: 최신 기술 컬럼 */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-white">
                  <TrendingUp className="w-5 h-5" />
                  <h2 className="text-xl font-bold">최신 기술 컬럼</h2>
                </div>
                <div className="space-y-4">
                  {techArticles.slice(0, 2).map((article) => (
                    <NewsArticleCard
                      key={article.id}
                      article={article}
                      variant="compact"
                    />
                  ))}
                </div>
                <Button
                  variant="outline"
                  className="w-full border-white text-white hover:bg-white hover:text-blue-600"
                >
                  <Link href="/tech-articles">더 많은 컬럼 보기</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 메인 컨텐츠 */}
        <section className="max-w-7xl mx-auto px-6 py-16 space-y-16">
          {/* 인기 프로젝트/스터디 */}
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                🔥 인기 모집글
              </h2>
              <p className="text-gray-600 dark:text-[#a0a0a0] text-lg">
                최근 주목받고 있는 프로젝트와 스터디를 확인해보세요
              </p>
            </div>
            <RecruitmentGrid posts={popularPosts} />
            <div className="text-center">
              <Button asChild size="lg" variant="outline">
                <Link href="/recruitment" className="flex items-center gap-2">
                  더 많은 모집글 보기
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* 기술 트렌드 & 이달의 개발자 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <TechTrends trends={techTrends} />
            <MonthlyDevelopers developers={monthlyDevelopers} />
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
