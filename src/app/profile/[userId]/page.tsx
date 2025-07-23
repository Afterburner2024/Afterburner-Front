"use client";

import { MainLayout } from "@/components/layouts/main-layout";
import { UserProfileCard } from "@/components/profile/user-profile-card";
import { UserStatsCard } from "@/components/profile/user-stats-card";
import { UserActivityTimeline } from "@/components/profile/user-activity-timeline";
import { UserProjectsGrid } from "@/components/profile/user-projects-grid";
import { ProfileEditModal } from "@/components/profile/profile-edit-modal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/auth-context";
import {
  mockUsers,
  mockUserStats,
  mockUserActivities,
  mockUserProjects,
} from "@/data/userMockData";
import { ArrowLeft, Share, Flag } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function UserProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { user: currentUser } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const userId = parseInt(params.userId as string);
  const user = mockUsers.find((u) => u.userId === userId);
  const userStats = mockUserStats[userId];
  const userActivities = mockUserActivities[userId] || [];
  const userProjects = mockUserProjects[userId] || [];

  // 현재 로그인된 사용자 ID와 비교 (쿠키의 id는 string, mockUser의 userId는 number)
  const isOwner = currentUser?.id === userId.toString();

  if (!user) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto p-4">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              사용자를 찾을 수 없습니다
            </h1>
            <p className="text-gray-600 dark:text-[#a0a0a0]">
              요청하신 사용자 프로필이 존재하지 않거나 비공개로 설정되어
              있습니다.
            </p>
            <Button asChild>
              <Link href="/">홈으로 돌아가기</Link>
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  // 비공개 프로필 체크
  if (!user.isPublic && !isOwner) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto p-4">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              비공개 프로필
            </h1>
            <p className="text-gray-600 dark:text-[#a0a0a0]">
              이 사용자는 프로필을 비공개로 설정했습니다.
            </p>
            <Button asChild>
              <Link href="/">홈으로 돌아가기</Link>
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  const handleShareProfile = async () => {
    try {
      await navigator.share({
        title: `${user.userName}님의 프로필`,
        text: `${user.userName}님의 프로필을 확인해보세요!`,
        url: window.location.href,
      });
    } catch (err) {
      // 웹 공유 API를 지원하지 않는 경우 클립보드에 복사
      navigator.clipboard.writeText(window.location.href);
      // 토스트 알림 (실제로는 toast 라이브러리 사용)
      alert("프로필 링크가 클립보드에 복사되었습니다!");
    }
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto p-4">
        {/* 상단 네비게이션 */}
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            뒤로가기
          </Button>

          <div className="flex items-center gap-2">
            {!isOwner && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShareProfile}
                  className="flex items-center gap-2"
                >
                  <Share className="w-4 h-4" />
                  공유
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 text-red-600 hover:text-red-700"
                >
                  <Flag className="w-4 h-4" />
                  신고
                </Button>
              </>
            )}
          </div>
        </div>

        {/* 프로필 레이아웃 */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 왼쪽: 프로필 카드 */}
          <div className="lg:col-span-1">
            <UserProfileCard
              user={user}
              isOwner={isOwner}
              onEditProfile={handleEditProfile}
            />
          </div>

          {/* 오른쪽: 메인 콘텐츠 */}
          <div className="lg:col-span-3 space-y-8">
            {/* 통계 카드 */}
            {userStats && <UserStatsCard stats={userStats} />}

            {/* 프로젝트와 활동을 나란히 배치 */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* 참여한 프로젝트 */}
              <UserProjectsGrid projects={userProjects} />

              {/* 최근 활동 */}
              <UserActivityTimeline activities={userActivities} />
            </div>

            {/* GitHub 스타일 기여도 히트맵 (추후 구현 예정) */}
            {user.githubUsername && (
              <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333333] rounded-lg p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      기여도 활동
                    </h3>
                    <Badge variant="outline" className="text-xs">
                      GitHub 연동 예정
                    </Badge>
                  </div>
                  <div className="text-center py-12 text-gray-500 dark:text-[#666666]">
                    <p className="text-sm">
                      기여도 히트맵이 곧 추가될 예정입니다
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 프로필 편집 모달 */}
      {isEditModalOpen && (
        <ProfileEditModal
          user={user}
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={(formData: any) => {
            // TODO: 실제 API 호출로 프로필 업데이트
            console.log("프로필 업데이트:", formData);
            setIsEditModalOpen(false);
          }}
        />
      )}
    </MainLayout>
  );
}
