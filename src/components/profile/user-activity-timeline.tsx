"use client";

import { UserActivity } from "@/types/user";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  FolderOpen,
  BookOpen,
  Plus,
  CheckCircle,
  Calendar,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

interface UserActivityTimelineProps {
  activities: UserActivity[];
  className?: string;
}

export function UserActivityTimeline({
  activities,
  className,
}: UserActivityTimelineProps) {
  const getActivityIcon = (type: UserActivity["type"]) => {
    switch (type) {
      case "project_join":
        return (
          <FolderOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        );
      case "project_complete":
        return (
          <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
        );
      case "study_join":
        return (
          <BookOpen className="w-4 h-4 text-purple-600 dark:text-purple-400" />
        );
      case "study_complete":
        return (
          <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
        );
      case "post_create":
        return (
          <Plus className="w-4 h-4 text-orange-600 dark:text-orange-400" />
        );
      default:
        return (
          <Calendar className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        );
    }
  };

  const getActivityBadge = (type: UserActivity["type"]) => {
    switch (type) {
      case "project_join":
        return (
          <Badge className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            프로젝트 참여
          </Badge>
        );
      case "project_complete":
        return (
          <Badge className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            프로젝트 완료
          </Badge>
        );
      case "study_join":
        return (
          <Badge className="text-xs bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
            스터디 참여
          </Badge>
        );
      case "study_complete":
        return (
          <Badge className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            스터디 완료
          </Badge>
        );
      case "post_create":
        return (
          <Badge className="text-xs bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
            모집글 작성
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" className="text-xs">
            활동
          </Badge>
        );
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      month: "long",
      day: "numeric",
    });
  };

  const sortedActivities = [...activities].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <Card
      className={`p-6 bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#333333] ${className}`}
    >
      <div className="space-y-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            최근 활동
          </h3>
          <Badge variant="outline" className="text-xs">
            {sortedActivities.length}개 활동
          </Badge>
        </div>

        {/* 타임라인 */}
        <ScrollArea className="h-96">
          <div className="space-y-6 pr-4">
            {sortedActivities.length > 0 ? (
              sortedActivities.map((activity, index) => (
                <div key={activity.id} className="relative">
                  {/* 타임라인 라인 */}
                  {index < sortedActivities.length - 1 && (
                    <div className="absolute left-5 top-10 w-0.5 h-16 bg-gray-200 dark:bg-[#333333]" />
                  )}

                  <div className="flex gap-4">
                    {/* 아이콘 */}
                    <div className="flex-shrink-0 w-10 h-10 bg-gray-50 dark:bg-[#2a2a2a] rounded-full flex items-center justify-center border-2 border-white dark:border-[#1a1a1a] shadow-sm">
                      {getActivityIcon(activity.type)}
                    </div>

                    {/* 내용 */}
                    <div className="flex-1 space-y-2">
                      <div className="space-y-2">
                        {/* 데스크톱: 한 줄 배치 */}
                        <div className="hidden sm:flex items-center justify-between gap-2">
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-1 flex-1">
                            {activity.title}
                          </h4>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {getActivityBadge(activity.type)}
                            <span className="text-xs text-gray-500 dark:text-[#666666] whitespace-nowrap">
                              {formatDate(activity.date)}
                            </span>
                          </div>
                        </div>

                        {/* 모바일: 세로 배치 */}
                        <div className="sm:hidden space-y-2">
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2">
                            {activity.title}
                          </h4>
                          <div className="flex items-center justify-between">
                            {getActivityBadge(activity.type)}
                            <span className="text-xs text-gray-500 dark:text-[#666666]">
                              {formatDate(activity.date)}
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-gray-600 dark:text-[#a0a0a0] line-clamp-2">
                          {activity.description}
                        </p>
                      </div>

                      {/* 프로젝트/스터디 링크 */}
                      {(activity.projectId || activity.studyId) && (
                        <div className="flex items-center gap-1 text-xs">
                          <Link
                            href={
                              activity.projectId
                                ? `/recruitment/${activity.projectId}`
                                : `/study/${activity.studyId}`
                            }
                            className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                          >
                            <ExternalLink className="w-3 h-3" />
                            자세히 보기
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-300 dark:text-[#666666] mx-auto mb-3" />
                <p className="text-gray-500 dark:text-[#666666] text-sm">
                  아직 활동 내역이 없습니다
                </p>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* 더보기 버튼 */}
        {sortedActivities.length > 5 && (
          <div className="text-center pt-4 border-t border-gray-100 dark:border-[#333333]">
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              모든 활동 보기
            </button>
          </div>
        )}
      </div>
    </Card>
  );
}
