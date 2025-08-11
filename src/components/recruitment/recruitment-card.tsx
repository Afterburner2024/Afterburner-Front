import { RecruitmentPost } from "@/types/recruitment";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar } from "lucide-react";
import { getStackColor } from "@/utils/stackColors";
import {
  formatDDay,
  getStatusLabel,
  getStatusColorClass,
  calculateDynamicStatus,
} from "@/utils/statusUtils";
import { format, parseISO } from "date-fns";
import { ko } from "date-fns/locale";
import Link from "next/link";
import { memo } from "react";

interface RecruitmentCardProps {
  post: RecruitmentPost;
}

function RecruitmentCardComponent({ post }: RecruitmentCardProps) {
  const dynamicStatus = calculateDynamicStatus(post);
  const statusLabel = getStatusLabel(dynamicStatus);
  const statusColorClass = getStatusColorClass(dynamicStatus);
  const dDayText = formatDDay(post.deadline);
  const isCompleted = dynamicStatus === "completed";
  const isUrgent = dynamicStatus === "urgent";

  return (
    <Link
      href={`/recruitment/${post.id}`}
      aria-label={`모집글 상세보기: ${post.title}`}
      className="focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary rounded"
    >
      <Card
        className={`
          relative p-6 bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#333333] 
          hover:shadow-lg transition-shadow duration-300 cursor-pointer
          h-[400px] flex flex-col
          ${
            isUrgent && !isCompleted ? "border-red-500 dark:border-red-400" : ""
          }
        `}
      >
        {/* 마감 도장 (완료된 프로젝트에만 표시) */}
        {isCompleted && (
          <div className="absolute top-3 right-3 z-10">
            <div className="relative">
              {/* 도장 그림자 */}
              <div className="absolute inset-0 w-20 h-20 bg-red-800 rounded-full transform rotate-12 blur-sm opacity-30 translate-x-1 translate-y-1"></div>

              {/* 메인 도장 */}
              <div className="relative w-20 h-20 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center transform rotate-12 shadow-xl border-2 border-red-400">
                {/* 내부 원 */}
                <div className="w-16 h-16 border-2 border-red-100 rounded-full flex items-center justify-center bg-red-600/20">
                  <div className="text-center">
                    <div className="text-red-50 font-black text-lg leading-none tracking-tight">
                      마감
                    </div>
                  </div>
                </div>

                {/* 도장 질감 효과 */}
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-transparent via-red-400/10 to-red-800/20"></div>
              </div>
            </div>
          </div>
        )}

        {/* 카드 내용 (마감시 투명도 적용) */}
        <div
          className={`flex flex-col h-full ${isCompleted ? "opacity-50" : ""}`}
        >
          {/* 상태 배지 */}
          <div className="flex justify-between items-start mb-3">
            <div className="flex gap-2">
              <Badge
                className={
                  post.type === "project"
                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs"
                    : "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs"
                }
              >
                {post.type === "project" ? "🚀" : "📚"}
              </Badge>
              <div
                className={`inline-flex items-center rounded-md px-2 sm:px-2.5 py-0.5 text-xs font-semibold ${statusColorClass}`}
              >
                {statusLabel}
              </div>
            </div>
            <span className="text-xs text-gray-500 dark:text-[#a0a0a0]">
              {dDayText}
            </span>
          </div>

          {/* 제목 */}
          <h3 className="text-lg font-bold text-gray-900 dark:text-[#ffffff] mb-2 line-clamp-2 h-14">
            {post.title}
          </h3>

          {/* 내용 */}
          <p className="text-sm text-gray-600 dark:text-[#a0a0a0] mb-4 line-clamp-4 flex-1">
            {post.content}
          </p>

          {/* 하단 영역 */}
          <div className="space-y-4">
            {/* 기술 스택 */}
            <div className="min-h-[48px]">
              <div className="flex flex-wrap gap-1 content-start">
                {post.stacks.slice(0, 6).map((stack, index) => (
                  <div
                    key={index}
                    className={`text-xs sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md font-medium ${getStackColor(
                      stack
                    )}`}
                    style={{ minHeight: 20 }}
                  >
                    {stack}
                  </div>
                ))}
                {post.stacks.length > 6 && (
                  <div
                    className="text-xs sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md font-medium bg-gray-600 text-white"
                    style={{ minHeight: 20 }}
                  >
                    +{post.stacks.length - 6}
                  </div>
                )}
              </div>
            </div>
            {/* 모집 정보 */}
            <div className="flex justify-between items-center text-xs text-gray-500 dark:text-[#a0a0a0]">
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span>{post.memberCount}명</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>
                  {format(parseISO(post.deadline), "yyyy.MM.dd", {
                    locale: ko,
                  })}
                </span>
              </div>
            </div>

            {/* 작성자 */}
            <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-[#333333]">
              <span className="text-xs text-gray-500 dark:text-[#a0a0a0]">
                by {post.author}
              </span>
              <span className="text-xs text-gray-400 dark:text-[#666666]">
                {format(parseISO(post.createdAt), "MM.dd", { locale: ko })}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export const RecruitmentCard = memo(RecruitmentCardComponent);
