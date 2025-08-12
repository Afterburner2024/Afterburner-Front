"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowLeft,
  MessageSquare,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  Edit,
  Trash2,
} from "lucide-react";
import { QuestionPost, Answer } from "@/types/question";
import { questionMockData } from "@/data/questionMockData";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { MainLayout } from "@/components/layouts/main-layout";
import { Reveal } from "@/components/ui/reveal";

export default function QuestionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const questionId = Number(params.id);

  const [question, setQuestion] = useState<QuestionPost | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [newAnswer, setNewAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // 실제로는 API 호출
    const foundQuestion = questionMockData.find((q) => q.id === questionId);
    if (foundQuestion) {
      setQuestion(foundQuestion);
      // 목업 답변 데이터
      setAnswers([
        {
          id: 1,
          content:
            "React에서 상태 관리 시 useState는 간단한 상태에 적합하고, useReducer는 복잡한 상태 로직에 적합합니다. useState는 단일 값이나 객체를 관리할 때 사용하고, useReducer는 여러 하위 값이 포함된 복잡한 상태 객체를 관리할 때 사용합니다.",
          author: "답변자1",
          authorId: 2,
          createdAt: "2024-01-15T11:30:00Z",
          isAccepted: false,
          voteCount: 5,
          questionId: questionId,
        },
        {
          id: 2,
          content:
            "useState는 간단한 상태 관리에, useReducer는 복잡한 상태 로직에 사용하세요. 특히 상태 업데이트 로직이 복잡하거나 여러 하위 값이 있는 경우 useReducer가 더 적합합니다.",
          author: "답변자2",
          authorId: 3,
          createdAt: "2024-01-15T12:15:00Z",
          isAccepted: true,
          voteCount: 8,
          questionId: questionId,
        },
      ]);
    }
  }, [questionId]);

  const handleSubmitAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnswer.trim()) return;

    setIsSubmitting(true);
    try {
      // TODO: API 호출로 답변 등록
      const newAnswerObj: Answer = {
        id: Date.now(),
        content: newAnswer,
        author: "현재 사용자",
        authorId: 1,
        createdAt: new Date().toISOString(),
        isAccepted: false,
        voteCount: 0,
        questionId: questionId,
      };

      setAnswers((prev) => [...prev, newAnswerObj]);
      setNewAnswer("");
    } catch (error) {
      console.error("답변 등록 실패:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAcceptAnswer = (answerId: number) => {
    // TODO: API 호출로 답변 채택
    setAnswers((prev) =>
      prev.map((answer) => ({
        ...answer,
        isAccepted: answer.id === answerId,
      }))
    );
  };

  const handleVote = (answerId: number, isUpvote: boolean) => {
    // TODO: API 호출로 투표
    setAnswers((prev) =>
      prev.map((answer) =>
        answer.id === answerId
          ? { ...answer, voteCount: answer.voteCount + (isUpvote ? 1 : -1) }
          : answer
      )
    );
  };

  if (!question) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-muted-foreground">질문을 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

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

  return (
    <MainLayout>
      <div className="min-h-svh bg-gray-50 dark:bg-[#171515]">
        <div className="flex flex-col space-y-10 p-6">
          {/* 뒤로가기 버튼 */}
          <div className="w-full max-w-7xl mx-auto">
            <Reveal>
              <Button
                variant="ghost"
                onClick={() => router.back()}
                className="mb-6 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                aria-label="목록으로 돌아가기"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                목록으로 돌아가기
              </Button>
            </Reveal>
          </div>

          {/* 질문 상세 */}
          <section className="w-full max-w-7xl mx-auto">
            <Reveal>
              <Card className="mb-8">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-4">
                        {getStatusIcon(question.status, question.isSolved)}
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                          {question.title}
                        </h1>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-2">
                          <Avatar className="w-6 h-6">
                            <AvatarImage
                              src=""
                              alt={`${question.author}의 아바타`}
                            />
                            <AvatarFallback>
                              {question.author[0]}
                            </AvatarFallback>
                          </Avatar>
                          <span>{question.author}</span>
                        </div>
                        <span>•</span>
                        <span>
                          {formatDistanceToNow(new Date(question.createdAt), {
                            addSuffix: true,
                            locale: ko,
                          })}
                        </span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{question.viewCount}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          <span>{answers.length}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 mb-4">
                        {question.difficulty && (
                          <Badge
                            variant="soft"
                            className={getDifficultyColor(question.difficulty)}
                          >
                            {question.difficulty === "beginner"
                              ? "초급"
                              : question.difficulty === "intermediate"
                              ? "중급"
                              : "고급"}
                          </Badge>
                        )}
                        {question.tags.map((tag) => (
                          <Badge key={tag} variant="soft">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        수정
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        삭제
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="prose max-w-none">
                    <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                      {question.content}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          </section>

          {/* 답변 목록 */}
          <section className="w-full max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 text-gray-900 dark:text-white">
              답변 ({answers.length})
            </h2>

            <div className="space-y-6">
              {answers.map((answer, idx) => (
                <Reveal key={answer.id} delayMs={idx * 60}>
                  <Card
                    className={
                      answer.isAccepted
                        ? "border-2 border-green-500 ring-1 ring-green-500/30"
                        : ""
                    }
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="flex flex-col items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleVote(answer.id, true)}
                            aria-label="이 답변에 추천"
                            className="focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                          >
                            <ThumbsUp className="w-4 h-4" />
                          </Button>
                          <span className="text-sm font-medium">
                            {answer.voteCount}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleVote(answer.id, false)}
                            aria-label="이 답변에 비추천"
                            className="focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                          >
                            <ThumbsDown className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <Avatar className="w-8 h-8">
                                <AvatarImage
                                  src=""
                                  alt={`${answer.author}의 아바타`}
                                />
                                <AvatarFallback>
                                  {answer.author[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium text-gray-900 dark:text-white">
                                  {answer.author}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {formatDistanceToNow(
                                    new Date(answer.createdAt),
                                    {
                                      addSuffix: true,
                                      locale: ko,
                                    }
                                  )}
                                </div>
                              </div>
                            </div>

                            {!answer.isAccepted && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleAcceptAnswer(answer.id)}
                                aria-label="이 답변을 채택"
                                className="focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                채택
                              </Button>
                            )}

                            {answer.isAccepted && (
                              <Badge className="border border-green-500 text-green-700 bg-transparent">
                                <CheckCircle className="w-4 h-4 mr-1" />
                                채택됨
                              </Badge>
                            )}
                          </div>

                          <div className="prose max-w-none">
                            <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                              {answer.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>
          </section>

          {/* 답변 작성 */}
          <section className="w-full max-w-7xl mx-auto">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  답변 작성
                </h3>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitAnswer}>
                  <Textarea
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                    placeholder="답변을 입력하세요..."
                    rows={6}
                    className="mb-4"
                  />
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={isSubmitting || !newAnswer.trim()}
                    >
                      {isSubmitting ? "등록 중..." : "답변 등록"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}
