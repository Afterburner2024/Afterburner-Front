"use client";

import { UserStats } from "@/types/user";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Calendar,
  FolderOpen,
  BookOpen,
  CheckCircle,
  GitBranch,
} from "lucide-react";

interface UserStatsCardProps {
  stats: UserStats;
  className?: string;
}

export function UserStatsCard({ stats, className }: UserStatsCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const completionRate = (completed: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((completed / total) * 100);
  };

  const projectCompletionRate = completionRate(
    stats.completedProjects,
    stats.totalProjects
  );
  const studyCompletionRate = completionRate(
    stats.completedStudies,
    stats.totalStudies
  );

  return (
    <Card
      className={`p-6 bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#333333] ${className}`}
    >
      <div className="space-y-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            활동 통계
          </h3>
          <Badge variant="secondary" className="text-xs">
            <Calendar className="w-3 h-3 mr-1" />
            {formatDate(stats.joinedAt)} 가입
          </Badge>
        </div>

        {/* 메인 통계 */}
        <div className="grid grid-cols-2 gap-4">
          {/* 프로젝트 통계 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FolderOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-[#cccccc]">
                프로젝트
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.totalProjects}
                </span>
                <div className="text-right">
                  <p className="text-xs text-gray-500 dark:text-[#666666]">
                    완료율
                  </p>
                  <p
                    className={`text-sm font-semibold ${
                      projectCompletionRate >= 70
                        ? "text-green-600 dark:text-green-400"
                        : projectCompletionRate >= 50
                        ? "text-yellow-600 dark:text-yellow-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {projectCompletionRate}%
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-gray-600 dark:text-[#a0a0a0]">
                  <span>완료: {stats.completedProjects}</span>
                  <span>
                    진행: {stats.totalProjects - stats.completedProjects}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-[#333333] rounded-full h-2">
                  <div
                    className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${projectCompletionRate}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 스터디 통계 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-[#cccccc]">
                스터디
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.totalStudies}
                </span>
                <div className="text-right">
                  <p className="text-xs text-gray-500 dark:text-[#666666]">
                    완료율
                  </p>
                  <p
                    className={`text-sm font-semibold ${
                      studyCompletionRate >= 70
                        ? "text-green-600 dark:text-green-400"
                        : studyCompletionRate >= 50
                        ? "text-yellow-600 dark:text-yellow-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {studyCompletionRate}%
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-gray-600 dark:text-[#a0a0a0]">
                  <span>완료: {stats.completedStudies}</span>
                  <span>
                    진행: {stats.totalStudies - stats.completedStudies}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-[#333333] rounded-full h-2">
                  <div
                    className="bg-purple-600 dark:bg-purple-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${studyCompletionRate}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 기여도 */}
        <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-[#333333]">
          <div className="flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-[#cccccc]">
              총 기여도
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-green-600 dark:text-green-400">
              {stats.contributions}
            </span>
            <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">기여 포인트</span>
            </div>
          </div>

          <p className="text-xs text-gray-500 dark:text-[#666666]">
            프로젝트 참여, 완료, 도움 등으로 얻은 기여 점수입니다.
          </p>
        </div>

        {/* 추가 정보 */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100 dark:border-[#333333]">
          <div className="text-center">
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {stats.completedProjects + stats.completedStudies}
            </p>
            <p className="text-xs text-gray-500 dark:text-[#666666]">
              완료한 활동
            </p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {Math.round(
                stats.contributions /
                  (stats.totalProjects + stats.totalStudies || 1)
              )}
            </p>
            <p className="text-xs text-gray-500 dark:text-[#666666]">
              평균 기여도
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
