"use client";

import { useMemo, useState } from "react";
import { RecruitmentHeader } from "@/components/recruitment/recruitment-header";
import { RecruitmentGrid } from "@/components/recruitment/recruitment-grid";
import { RecruitmentFilters } from "@/components/recruitment/recruitment-filters";
import { RecruitmentCreateModal } from "@/components/recruitment/recruitment-create-modal";
import { useRecruitment } from "@/hooks/useRecruitment";
import { MainLayout } from "@/components/layouts/main-layout";
import { Reveal } from "@/components/ui/reveal";

export default function RecruitmentPage() {
  const { posts, totalCount, addPost, filters, setFilters } = useRecruitment();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 프로젝트와 스터디로 분리
  const projectPosts = useMemo(
    () => posts.filter((post) => post.type === "project"),
    [posts]
  );
  const studyPosts = useMemo(
    () => posts.filter((post) => post.type === "study"),
    [posts]
  );

  return (
    <MainLayout>
      <div className="min-h-svh bg-gray-50 dark:bg-[#171515]">
        <div className="flex flex-col space-y-8 p-6">
          {/* 페이지 헤더 */}
          <Reveal
            as="section"
            className="flex flex-col items-center space-y-4 pt-4"
          >
            <h1 className="text-5xl font-bold text-gray-900 dark:text-[#ffa500] text-center">
              팀원 모집 게시판
            </h1>
            <p className="text-gray-600 dark:text-[#a0a0a0] max-w-2xl text-center">
              함께할 팀원을 찾거나 프로젝트에 참여해보세요! 🚀
            </p>
          </Reveal>

          {/* 전체 헤더 및 필터링 */}
          <Reveal
            as="section"
            className="w-full max-w-7xl mx-auto space-y-6"
            delayMs={80}
          >
            <RecruitmentHeader
              totalPosts={posts.length}
              onCreatePost={() => setIsModalOpen(true)}
            />

            <RecruitmentFilters
              filters={filters}
              onFiltersChange={setFilters}
              totalCount={totalCount}
              filteredCount={posts.length}
            />
          </Reveal>

          {/* 프로젝트 섹션 */}
          {(filters.typeFilter === "all" ||
            filters.typeFilter === "project") && (
            <section className="w-full max-w-7xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    🚀 프로젝트
                  </h2>
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                    {projectPosts.length}개
                  </span>
                </div>
              </div>
              {projectPosts.length > 0 ? (
                <RecruitmentGrid posts={projectPosts} />
              ) : (
                <div className="text-center py-12 bg-white dark:bg-[#1a1a1a] rounded-lg border border-gray-200 dark:border-[#333333]">
                  <p className="text-gray-500 dark:text-[#a0a0a0] text-lg mb-2">
                    조건에 맞는 프로젝트가 없습니다
                  </p>
                  <p className="text-gray-400 dark:text-[#666666] text-sm">
                    필터 조건을 변경하거나 새로운 프로젝트를 등록해보세요
                  </p>
                </div>
              )}
            </section>
          )}

          {/* 스터디 섹션 */}
          {(filters.typeFilter === "all" || filters.typeFilter === "study") && (
            <section className="w-full max-w-7xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    📚 스터디
                  </h2>
                  <span className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                    {studyPosts.length}개
                  </span>
                </div>
              </div>
              {studyPosts.length > 0 ? (
                <RecruitmentGrid posts={studyPosts} />
              ) : (
                <div className="text-center py-12 bg-white dark:bg-[#1a1a1a] rounded-lg border border-gray-200 dark:border-[#333333]">
                  <p className="text-gray-500 dark:text-[#a0a0a0] text-lg mb-2">
                    조건에 맞는 스터디가 없습니다
                  </p>
                  <p className="text-gray-400 dark:text-[#666666] text-sm">
                    필터 조건을 변경하거나 새로운 스터디를 등록해보세요
                  </p>
                </div>
              )}
            </section>
          )}

          {/* 전체 검색 결과가 없을 때 */}
          {posts.length === 0 && totalCount > 0 && (
            <section className="w-full max-w-7xl mx-auto">
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-[#a0a0a0] text-lg mb-4">
                  검색 조건에 맞는 모집글이 없습니다.
                </p>
                <p className="text-gray-400 dark:text-[#666666] text-sm">
                  필터 조건을 변경하거나 새로운 모집글을 등록해보세요.
                </p>
              </div>
            </section>
          )}

          {/* TODO: 향후 추가 기능들 */}

          {/* 모집글 작성 모달 */}
          <RecruitmentCreateModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={addPost}
          />
        </div>
      </div>
    </MainLayout>
  );
}
