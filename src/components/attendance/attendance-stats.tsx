"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CountUp } from "@/components/ui/count-up";
import { Comment } from "@/types/attendance";
import {
  eachDayOfInterval,
  endOfDay,
  startOfDay,
  subDays,
  isSameDay,
} from "date-fns";

interface AttendanceStatsProps {
  comments: Comment[];
}

function calculateStreak(comments: Comment[]): number {
  if (comments.length === 0) return 0;
  const days = new Set(
    comments.map((c) => startOfDay(c.timestamp).toISOString())
  );
  let streak = 0;
  for (let i = 0; i < 365; i++) {
    const day = startOfDay(subDays(new Date(), i)).toISOString();
    if (days.has(day)) streak += 1;
    else break;
  }
  return streak;
}

export function AttendanceStats({ comments }: AttendanceStatsProps) {
  const today = new Date();
  const startWeek = startOfDay(subDays(today, 6));
  const weekDays = eachDayOfInterval({ start: startWeek, end: today });

  const commentsToday = comments.filter((c) =>
    isSameDay(c.timestamp, today)
  ).length;
  const commentsThisWeek = comments.filter(
    (c) =>
      c.timestamp >= startOfDay(startWeek) && c.timestamp <= endOfDay(today)
  ).length;
  const activeDaysThisWeek = new Set(
    comments
      .filter(
        (c) =>
          c.timestamp >= startOfDay(startWeek) && c.timestamp <= endOfDay(today)
      )
      .map((c) => startOfDay(c.timestamp).toDateString())
  ).size;
  const streak = calculateStreak(comments);

  return (
    <section className="w-full max-w-4xl mx-auto">
      <Card className="p-4 sm:p-6 bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#333333]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <div className="text-xs text-gray-500 dark:text-[#a0a0a0]">
              오늘 댓글
            </div>
            <CountUp
              value={commentsToday}
              className="text-2xl font-bold text-gray-900 dark:text-white"
              aria-label={`오늘 댓글 ${commentsToday}개`}
            />
          </div>
          <div className="space-y-1">
            <div className="text-xs text-gray-500 dark:text-[#a0a0a0]">
              이번 주 총 댓글
            </div>
            <CountUp
              value={commentsThisWeek}
              className="text-2xl font-bold text-gray-900 dark:text-white"
              aria-label={`이번 주 총 댓글 ${commentsThisWeek}개`}
            />
          </div>
          <div className="space-y-1">
            <div className="text-xs text-gray-500 dark:text-[#a0a0a0]">
              이번 주 활동일
            </div>
            <CountUp
              value={activeDaysThisWeek}
              className="text-2xl font-bold text-gray-900 dark:text-white"
              suffix="일"
              aria-label={`이번 주 활동일 ${activeDaysThisWeek}일`}
            />
          </div>
          <div className="space-y-1">
            <div className="text-xs text-gray-500 dark:text-[#a0a0a0]">
              연속 출석
            </div>
            <div className="flex items-center gap-2">
              <CountUp
                value={streak}
                className="text-2xl font-bold text-gray-900 dark:text-white"
                aria-label={`연속 출석 ${streak}일`}
              />
              <Badge variant="secondary">streak</Badge>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}

export default AttendanceStats;
