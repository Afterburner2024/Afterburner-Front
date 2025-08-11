"use client";

import { memo } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Eye, CheckCircle, AlertCircle } from "lucide-react";
import { QuestionPost } from "@/types/question";
import { QuestionSort } from "@/utils/query";
import {
  getDifficultyBadgeClass,
  getPriorityBadgeClass,
} from "@/utils/statusColors";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { Reveal } from "@/components/ui/reveal";

interface QuestionGridProps {
  questions: QuestionPost[];
  sortBy: QuestionSort;
  onChangeSort: (sort: QuestionSort) => void;
}

function QuestionGridComponent({
  questions,
  sortBy,
  onChangeSort,
}: QuestionGridProps) {
  const getStatusIcon = (status: string, isSolved: boolean) => {
    if (isSolved) return <CheckCircle className="w-4 h-4 text-green-500" />;
    if (status === "open")
      return <AlertCircle className="w-4 h-4 text-orange-500" />;
    return <AlertCircle className="w-4 h-4 text-gray-500" />;
  };

  const getDifficultyColor = (difficulty?: string) =>
    getDifficultyBadgeClass(difficulty);
  const getPriorityColor = (priority?: string) =>
    getPriorityBadgeClass(priority);

  return (
    <div className="space-y-4">
      {/* 정렬 옵션 */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          총 {questions.length}개의 질문
        </div>
        <div className="flex gap-2">
          <Button
            variant={sortBy === "latest" ? "default" : "outline"}
            size="sm"
            onClick={() => onChangeSort("latest")}
          >
            최신순
          </Button>
          <Button
            variant={sortBy === "popular" ? "default" : "outline"}
            size="sm"
            onClick={() => onChangeSort("popular")}
          >
            인기순
          </Button>
          <Button
            variant={sortBy === "unanswered" ? "default" : "outline"}
            size="sm"
            onClick={() => onChangeSort("unanswered")}
          >
            답변없음
          </Button>
        </div>
      </div>

      {/* 질문 목록 */}
      <div className="grid gap-4">
        {questions.map((question, idx) => (
          <Reveal key={question.id} delayMs={idx * 50}>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getStatusIcon(question.status, question.isSolved)}
                      <Link
                        href={`/questions/${question.id}`}
                        aria-label={`질문 상세보기: ${question.title}`}
                        className="text-lg font-semibold hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary rounded"
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
                      <Badge
                        className={getDifficultyColor(question.difficulty)}
                      >
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
          </Reveal>
        ))}
      </div>

      {questions.length === 0 && (
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

export const QuestionGrid = memo(QuestionGridComponent);
