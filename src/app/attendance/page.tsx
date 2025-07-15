"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layouts/main-layout";
import Calendar from "react-calendar";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import "react-calendar/dist/Calendar.css";
import "@/assets/css/calendar.css";

// TODO: 기능 구현 목록
// 1. 로그인 연동
//    - NextAuth.js를 사용한 GitHub OAuth 구현
//    - 사용자 세션 관리
//    - 로그인한 사용자만 댓글 작성 가능하도록 제한
//
// 2. 댓글 DB 연동
//    - Supabase 테이블 설계 (users, comments)
//    - 댓글 CRUD 기능 구현
//    - 실시간 업데이트 구현
//
// 3. 날짜별 댓글 필터링
//    - 선택된 날짜의 댓글만 표시
//    - 날짜별 댓글 개수 표시
//    - 달력에 댓글 있는 날짜 하이라이트
//
// 4. 출석 통계
//    - 월별/주별 출석률 차트
//    - 개인별 출석 현황
//    - 전체 출석 순위
//
// 5. 출석 스트릭
//    - GitHub 스타일의 연속 출석 표시
//    - 최대/현재 스트릭 표시
//    - 스트릭 달성 시 특별 이펙트

type Comment = {
  id: number;
  user: {
    name: string;
    image: string;
  };
  content: string;
  date: string;
};

// 임시 댓글 데이터
const initialComments: Comment[] = [
  {
    id: 1,
    user: {
      name: "주순태",
      image: "https://github.com/Stjoo0925.png",
    },
    content: "오늘도 화이팅! 👋",
    date: "2024-03-15T10:00:00",
  },
  {
    id: 2,
    user: {
      name: "강형석",
      image: "https://github.com/ppudding3861.png",
    },
    content: "출석체크 완료! 😊",
    date: "2024-03-15T09:30:00",
  },
];

export default function AttendancePage() {
  const [date, setDate] = useState<Date>(new Date());
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: comments.length + 1,
      user: {
        name: "주순태", // 실제로는 로그인한 사용자 정보를 사용
        image: "https://github.com/Stjoo0925.png",
      },
      content: newComment,
      date: new Date().toISOString(),
    };

    setComments([comment, ...comments]);
    setNewComment("");
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
              />
            </Card>
          </section>

          {/* 댓글 섹션 */}
          <section className="w-full max-w-4xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
              오늘의 한마디 😛
            </h2>

            {/* 댓글 입력 */}
            <Card className="p-6 shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow duration-300">
              <div className="space-y-4">
                <div className="relative">
                  <Textarea
                    placeholder="오늘의 기분은 어때요? 따뜻한 한마디 남겨주세요... ✨"
                    value={newComment}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setNewComment(e.target.value)
                    }
                    className="min-h-[120px] resize-none border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 transition-colors duration-300"
                  />
                  <div className="absolute bottom-3 right-3 text-sm text-gray-400">
                    {newComment.length}/200
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button
                    onClick={handleAddComment}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 font-medium transition-colors duration-300"
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
                  className="p-6 shadow-md bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <Avatar className="ring-2 ring-gray-200 dark:ring-gray-700">
                      <AvatarImage
                        src={comment.user.image}
                        alt={comment.user.name}
                      />
                      <AvatarFallback className="bg-blue-600 text-white">
                        {comment.user.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {comment.user.name}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                          {format(new Date(comment.date), "PPP p", {
                            locale: ko,
                          })}
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}
