"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, MessageSquare, Eye, Clock } from "lucide-react";
import { QuestionPost } from "@/types/question";
import { QuestionGrid } from "@/components/questions/question-grid";
import { QuestionFilters } from "@/components/questions/question-filters";
import { QuestionCreateModal } from "@/components/questions/question-create-modal";

export default function QuestionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 헤더 섹션 */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">질문게시판</h1>
            <p className="text-muted-foreground mt-2">
              개발 관련 질문을 올리고 답변을 받아보세요
            </p>
          </div>
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            질문하기
          </Button>
        </div>

        {/* 검색 및 필터 */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="질문을 검색해보세요..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <QuestionFilters
            selectedCategory={selectedCategory}
            selectedStatus={selectedStatus}
            onCategoryChange={handleCategoryChange}
            onStatusChange={handleStatusChange}
          />
        </div>
      </div>

      {/* 질문 목록 */}
      <QuestionGrid
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        selectedStatus={selectedStatus}
      />

      {/* 질문 작성 모달 */}
      <QuestionCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
