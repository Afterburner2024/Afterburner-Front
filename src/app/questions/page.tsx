"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { QuestionGrid } from "@/components/questions/question-grid";
import { QuestionFilters } from "@/components/questions/question-filters";
import { QuestionCreateModal } from "@/components/questions/question-create-modal";
import { MainLayout } from "@/components/layouts/main-layout";
import { Reveal } from "@/components/ui/reveal";
import { useQuestions } from "@/hooks/useQuestions";

export default function QuestionsPage() {
  const {
    questions,
    searchQuery,
    selectedCategory,
    selectedStatus,
    sortBy,
    setSearchQuery,
    setSelectedCategory,
    setSelectedStatus,
    setSortBy,
  } = useQuestions();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <MainLayout>
      <div className="min-h-svh bg-gray-50 dark:bg-[#171515]">
        <div className="flex flex-col space-y-10 p-6">
          {/* 페이지 헤더 */}
          <Reveal
            as="section"
            className="flex flex-col items-center space-y-4 pt-4"
          >
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-[#ffa500] text-center">
              질문게시판
            </h1>
            <p className="text-gray-600 dark:text-[#a0a0a0] max-w-2xl text-center">
              개발 관련 질문을 올리고 답변을 받아보세요! 💡
            </p>
          </Reveal>

          {/* 검색 및 필터 섹션 (Sticky) */}
          <section className="w-full">
            <div className="sticky top-14 z-30 bg-transparent">
              <div className="w-full max-w-7xl mx-auto px-6 py-3 md:py-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        placeholder="질문을 검색해보세요..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-transparent border-border"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <QuestionFilters
                      selectedCategory={selectedCategory}
                      selectedStatus={selectedStatus}
                      onCategoryChange={setSelectedCategory}
                      onStatusChange={setSelectedStatus}
                    />
                    <Button
                      onClick={() => setIsCreateModalOpen(true)}
                      className="flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      질문하기
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 질문 목록 섹션 */}
          <section className="w-full max-w-7xl mx-auto">
            <QuestionGrid
              questions={questions}
              sortBy={sortBy}
              onChangeSort={setSortBy}
              isLoading={isLoading}
            />
          </section>

          {/* 질문 작성 모달 */}
          <QuestionCreateModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
          />
        </div>
      </div>
    </MainLayout>
  );
}
