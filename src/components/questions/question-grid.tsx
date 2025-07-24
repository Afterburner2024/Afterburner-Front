"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { QuestionPost } from "@/types/question";
import { questionMockData } from "@/data/questionMockData";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

interface QuestionGridProps {
  searchQuery: string;
  selectedCategory: string;
  selectedStatus: string;
}

export function QuestionGrid({
  searchQuery,
  selectedCategory,
  selectedStatus,
}: QuestionGridProps) {
  const [sortBy, setSortBy] = useState<"latest" | "popular" | "unanswered">(
    "latest"
  );

  const filteredQuestions = useMemo(() => {
    let filtered = questionMockData;

    // 검색어 필터링
    if (searchQuery) {
      filtered = filtered.filter(
        (question) =>
          question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          question.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          question.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    // 카테고리 필터링
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (question) => question.category === selectedCategory
      );
    }

    // 상태 필터링
    if (selectedStatus !== "all") {
      filtered = filtered.filter(
        (question) => question.status === selectedStatus
      );
    }

    // 정렬
    switch (sortBy) {
      case "latest":
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "popular":
        filtered.sort((a, b) => b.viewCount - a.viewCount);
        break;
      case "unanswered":
        filtered.sort((a, b) => a.answerCount - b.answerCount);
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedStatus, sortBy]);

  const getStatusIcon = (status: string, isSolved: boolean) => {
    if (isSolved) return <CheckCircle className="w-4 h-4 text-green-500" />;
    if (status === "open")
      return <AlertCircle className="w-4 h-4 text-orange-500" />;
    return <AlertCircle className="w-4 h-4 text-gray-500" />;
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "low":
        return "bg-blue-100 text-blue-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "high":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      {/* 정렬 옵션 */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          총 {filteredQuestions.length}개의 질문
        </div>
        <div className="flex gap-2">
          <Button
            variant={sortBy === "latest" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("latest")}
          >
            최신순
          </Button>
          <Button
            variant={sortBy === "popular" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("popular")}
          >
            인기순
          </Button>
          <Button
            variant={sortBy === "unanswered" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("unanswered")}
          >
            답변없음
          </Button>
        </div>
      </div>

      {/* 질문 목록 */}
      <div className="grid gap-4">
        {filteredQuestions.map((question) => (
          <Card key={question.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {getStatusIcon(question.status, question.isSolved)}
                    <Link
                      href={`/questions/${question.id}`}
                      className="text-lg font-semibold hover:text-primary transition-colors"
                    >
                      {question.title}
                    </Link>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{question.author}</span>
                    <span>•</span>
                    <span>
                      {formatDistanceToNow(new Date(question.createdAt), {
                        addSuffix: true,
                        locale: ko,
                      })}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {question.difficulty && (
                    <Badge className={getDifficultyColor(question.difficulty)}>
                      {question.difficulty === "beginner"
                        ? "초급"
                        : question.difficulty === "intermediate"
                        ? "중급"
                        : "고급"}
                    </Badge>
                  )}
                  {question.priority && (
                    <Badge className={getPriorityColor(question.priority)}>
                      {question.priority === "low"
                        ? "낮음"
                        : question.priority === "medium"
                        ? "보통"
                        : "높음"}
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-muted-foreground mb-3 line-clamp-2">
                {question.content}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{question.viewCount}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    <span>{question.answerCount}</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  {question.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {question.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{question.tags.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredQuestions.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            검색 결과가 없습니다.
          </div>
          <p className="text-sm text-muted-foreground">
            다른 검색어나 필터를 시도해보세요.
          </p>
        </div>
      )}
    </div>
  );
}
