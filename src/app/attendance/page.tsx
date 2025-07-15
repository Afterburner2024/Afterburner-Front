"use client";

import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layouts/main-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Calendar from "react-calendar";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

// Calendar CSS import
import "@/assets/css/calendar.css";

interface Comment {
  id: number;
  user: string;
  avatar?: string;
  content: string;
  timestamp: Date;
}

const initialComments: Comment[] = [
  {
    id: 1,
    user: "김개발",
    content: "오늘도 화이팅! 🔥",
    timestamp: new Date("2024-01-15T09:30:00"),
  },
  {
    id: 2,
    user: "박코딩",
    avatar: "/api/placeholder/32/32",
    content: "새로운 프로젝트 시작했어요! 같이 해요~",
    timestamp: new Date("2024-01-15T10:15:00"),
  },
  {
    id: 3,
    user: "이프론트",
    content: "리액트 공부 중입니다. 질문있어요!",
    timestamp: new Date("2024-01-15T11:00:00"),
  },
];

export default function AttendancePage() {
  const [date, setDate] = useState<Date>(new Date());
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  // 화면 크기 감지
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleSubmit = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      user: "익명",
      content: newComment,
      timestamp: new Date(),
    };

    setComments([comment, ...comments]);
    setNewComment("");
  };

  // 모바일에서 "일" 제거하는 formatDay 함수
  const formatDay = (locale: string | undefined, date: Date) => {
    if (isMobile) {
      return format(date, "d", { locale: ko }); // 숫자만
    }
    return format(date, "d일", { locale: ko }); // 데스크톱에서는 "일" 포함
  };

  // 요일 표시 포맷팅 (모바일에서 짧게)
  const formatShortWeekday = (locale: string | undefined, date: Date) => {
    if (isMobile) {
      const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
      return weekdays[date.getDay()];
    }
    return format(date, "eee", { locale: ko }); // 월, 화, 수...
  };

  // 월/년 네비게이션 라벨 포맷팅
  const formatMonthYear = (locale: string | undefined, date: Date) => {
    if (isMobile) {
      return format(date, "yy.M", { locale: ko }); // 24.1 형태
    }
    return format(date, "yyyy년 M월", { locale: ko }); // 2024년 1월 형태
  };

  // 월 선택기 포맷팅
  const formatMonth = (locale: string | undefined, date: Date) => {
    if (isMobile) {
      return format(date, "M", { locale: ko }); // 1, 2, 3...
    }
    return format(date, "M월", { locale: ko }); // 1월, 2월, 3월...
  };

  // 년 선택기 포맷팅
  const formatYear = (locale: string | undefined, date: Date) => {
    if (isMobile) {
      return format(date, "yy", { locale: ko }); // 24, 25...
    }
    return format(date, "yyyy", { locale: ko }); // 2024, 2025...
  };

  return (
    <MainLayout>
      <div className="min-h-svh bg-gray-50 dark:bg-gray-900 select-none">
        <div className="flex flex-col space-y-8 p-6">
          {/* 헤더 섹션 */}
          <section className="flex flex-col items-center space-y-4 pt-8">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
              출석 게시판
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl text-center">
              매일매일 함께하는 애프터버너 출석체크 🔥
            </p>
          </section>

          {/* 달력 섹션 */}
          <section className="flex flex-col items-center space-y-4">
            <Card className="p-6 w-full max-w-4xl shadow-lg bg-white dark:bg-gray-800">
              <Calendar
                onChange={(value) => {
                  if (value instanceof Date) {
                    setDate(value);
                  }
                }}
                value={date}
                locale="ko"
                className="w-full border-none calendar-modern"
                formatDay={formatDay}
                formatShortWeekday={formatShortWeekday}
                formatMonthYear={formatMonthYear}
                formatMonth={formatMonth}
                formatYear={formatYear}
              />
            </Card>
          </section>

          {/* 댓글 섹션 */}
          <section className="w-full max-w-4xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
              오늘의 한마디 😛
            </h2>

            {/* 댓글 입력 */}
            <Card className="p-6 bg-white dark:bg-gray-800">
              <div className="space-y-4">
                <Textarea
                  placeholder="오늘 하루는 어떠셨나요? 자유롭게 이야기해보세요! 💭"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="min-h-[100px] resize-none"
                />
                <div className="flex justify-end">
                  <Button
                    onClick={handleSubmit}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                  >
                    등록하기
                  </Button>
                </div>
              </div>
            </Card>

            {/* 댓글 목록 */}
            <div className="space-y-4">
              {comments.map((comment) => (
                <Card
                  key={comment.id}
                  className="p-4 bg-white dark:bg-gray-800 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-10 h-10 flex-shrink-0">
                      {comment.avatar ? (
                        <AvatarImage src={comment.avatar} alt={comment.user} />
                      ) : (
                        <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                          {comment.user.charAt(0)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                          {comment.user}
                        </h4>
                        <time className="text-xs text-gray-500 dark:text-gray-400">
                          {format(comment.timestamp, "MM월 dd일 HH:mm", {
                            locale: ko,
                          })}
                        </time>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* TODO: 향후 개발 예정 기능들 */}
          {/* 
          - 로그인 연동 (NextAuth.js with GitHub OAuth)
          - 데이터베이스 연동 (Supabase) 
          - 날짜별 댓글 필터링
          - 출석 통계 표시
          - 출석 스트릭 기능
          */}
        </div>
      </div>
    </MainLayout>
  );
}
