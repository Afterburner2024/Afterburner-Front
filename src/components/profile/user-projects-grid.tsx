"use client";

import { UserProject } from "@/types/user";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getStackColor } from "@/utils/stackColors";
import {
  FolderOpen,
  Users,
  Calendar,
  CheckCircle,
  Clock,
  Crown,
  Github,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { memo } from "react";

interface UserProjectsGridProps {
  projects: UserProject[];
  className?: string;
}

function UserProjectsGridComponent({
  projects,
  className,
}: UserProjectsGridProps) {
  const getStatusBadge = (status: UserProject["status"]) => {
    switch (status) {
      case "recruiting":
        return (
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            모집중
          </Badge>
        );
      case "in_progress":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            진행중
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            완료
          </Badge>
        );
      default:
        return <Badge variant="secondary">알 수 없음</Badge>;
    }
  };

  const getRoleBadge = (role: UserProject["role"]) => {
    switch (role) {
      case "leader":
        return (
          <div className="flex items-center gap-1">
            <Crown className="w-3 h-3 text-yellow-600 dark:text-yellow-400" />
            <span className="text-xs font-medium text-yellow-600 dark:text-yellow-400">
              리더
            </span>
          </div>
        );
      case "member":
        return (
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3 text-gray-600 dark:text-gray-400" />
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
              팀원
            </span>
          </div>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "short",
    });
  };

  const sortedProjects = [...projects].sort((a, b) => {
    // 진행중 → 모집중 → 완료 순으로 정렬
    const statusOrder = { in_progress: 0, recruiting: 1, completed: 2 };
    if (statusOrder[a.status] !== statusOrder[b.status]) {
      return statusOrder[a.status] - statusOrder[b.status];
    }
    // 같은 상태면 최신순
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });

  return (
    <Card
      className={`p-6 bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#333333] ${className}`}
    >
      <div className="space-y-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            참여한 프로젝트
          </h3>
          <Badge variant="outline" className="text-xs">
            {projects.length}개 프로젝트
          </Badge>
        </div>

        {/* 프로젝트 그리드 */}
        <ScrollArea className="h-96">
          <div className="space-y-4 pr-4">
            {sortedProjects.length > 0 ? (
              sortedProjects.map((project) => (
                <Card
                  key={project.id}
                  className="p-4 bg-gray-50 dark:bg-[#2a2a2a] border-gray-200 dark:border-[#444444] hover:shadow-md transition-shadow"
                >
                  <div className="space-y-3">
                    {/* 상단: 제목과 상태 */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-1">
                            {project.title}
                          </h4>
                          {getRoleBadge(project.role)}
                        </div>
                        <p className="text-xs text-gray-600 dark:text-[#a0a0a0] line-clamp-2">
                          {project.description}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        {getStatusBadge(project.status)}
                      </div>
                    </div>

                    {/* 기술 스택 */}
                    <div className="flex flex-wrap gap-1">
                      {project.techStacks.slice(0, 4).map((stack, index) => (
                        <Badge
                          key={index}
                          className={`text-xs ${getStackColor(
                            stack
                          )} inline-flex items-center h-5`}
                        >
                          <span className="leading-none">{stack}</span>
                        </Badge>
                      ))}
                      {project.techStacks.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.techStacks.length - 4}
                        </Badge>
                      )}
                    </div>

                    {/* 하단: 정보와 액션 */}
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-[#666666]">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{project.memberCount}명</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(project.startDate)}</span>
                          {project.endDate && (
                            <>
                              <span>~</span>
                              <span>{formatDate(project.endDate)}</span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        <Link
                          href={`/recruitment/${project.id}`}
                          aria-label={`${project.title} 모집글 상세로 이동`}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary rounded"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <FolderOpen className="w-12 h-12 text-gray-300 dark:text-[#666666] mx-auto mb-3" />
                <p className="text-gray-500 dark:text-[#666666] text-sm">
                  아직 참여한 프로젝트가 없습니다
                </p>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* 더보기 버튼 */}
        {sortedProjects.length > 6 && (
          <div className="text-center pt-4 border-t border-gray-100 dark:border-[#333333]">
            <Button variant="outline" size="sm">
              모든 프로젝트 보기
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}

export const UserProjectsGrid = memo(UserProjectsGridComponent);
