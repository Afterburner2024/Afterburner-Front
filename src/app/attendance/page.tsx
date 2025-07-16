"use client";

import { useState } from "react";
import { StandardPageLayout } from "@/components/layouts/standard-page-layout";
import { AttendanceCalendar } from "@/components/attendance/attendance-calendar";
import { CommentsSection } from "@/components/attendance/comments-section";
import { Comment } from "@/types/attendance";
import { initialComments } from "@/data/attendanceMockData";

export default function AttendancePage() {
  const [date, setDate] = useState<Date>(new Date());
  const [comments, setComments] = useState<Comment[]>(initialComments);

  const handleAddComment = (comment: Comment) => {
    setComments([comment, ...comments]);
  };

  return (
    <StandardPageLayout
      title="출석 게시판"
      description="매일매일 함께하는 애프터버너 출석체크 🔥"
      className="select-none"
      contentClassName="space-y-8"
    >
      {/* 달력 섹션 */}
      <AttendanceCalendar date={date} onChange={setDate} />

      {/* 댓글 섹션 */}
      <CommentsSection comments={comments} onAddComment={handleAddComment} />

      {/* TODO: 향후 개발 예정 기능들 */}
      {/* 
      - 로그인 연동 (NextAuth.js with GitHub OAuth)
      - 데이터베이스 연동 (Supabase) 
      - 날짜별 댓글 필터링
      - 출석 통계 표시
      - 출석 스트릭 기능
      */}
    </StandardPageLayout>
  );
}
