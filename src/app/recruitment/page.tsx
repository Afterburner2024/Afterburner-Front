"use client";

import { useState, useMemo } from "react";
import { StandardPageLayout } from "@/components/layouts/standard-page-layout";
import { RecruitmentPost } from "@/types/recruitment";
import { FilterState } from "@/types/filters";
import { mockPosts } from "@/data/mockData";
import { RecruitmentHeader } from "@/components/recruitment/recruitment-header";
import { RecruitmentGrid } from "@/components/recruitment/recruitment-grid";
import { RecruitmentFilters } from "@/components/recruitment/recruitment-filters";
import { RecruitmentCreateModal } from "@/components/recruitment/recruitment-create-modal";
import { applyFilters } from "@/utils/filterUtils";
import { applyDynamicStatusToPosts } from "@/utils/statusUtils";

export default function RecruitmentPage() {
  const [posts, setPosts] = useState<RecruitmentPost[]>(mockPosts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    techStacks: [],
    status: "all",
    dateFilter: "all",
    sortBy: "latest",
  });

  const handleAddPost = (
    newPostData: Omit<RecruitmentPost, "id" | "createdAt">
  ) => {
    const newPost: RecruitmentPost = {
      ...newPostData,
      id: Math.max(...posts.map((p) => p.id)) + 1,
      createdAt: new Date().toISOString(),
    };
    setPosts([newPost, ...posts]);
  };

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  // 동적 상태가 적용된 게시글
  const postsWithDynamicStatus = useMemo(() => {
    return applyDynamicStatusToPosts(posts);
  }, [posts]);

  // 필터링된 게시글
  const filteredPosts = useMemo(() => {
    return applyFilters(postsWithDynamicStatus, filters);
  }, [postsWithDynamicStatus, filters]);

  return (
    <StandardPageLayout
      title="팀원 모집 게시판"
      description="함께할 팀원을 찾거나 프로젝트에 참여해보세요! 🚀"
      contentClassName="space-y-8"
    >
      {/* 헤더 */}
      <RecruitmentHeader
        totalPosts={filteredPosts.length}
        onCreatePost={() => setIsModalOpen(true)}
      />

      {/* 필터링 */}
      <RecruitmentFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        totalCount={posts.length}
        filteredCount={filteredPosts.length}
      />

      {/* 모집 게시글 그리드 */}
      <RecruitmentGrid posts={filteredPosts} />

      {/* 검색 결과가 없을 때 */}
      {filteredPosts.length === 0 && posts.length > 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-[#a0a0a0] text-lg mb-4">
            검색 조건에 맞는 프로젝트가 없습니다.
          </p>
          <p className="text-gray-400 dark:text-[#666666] text-sm">
            필터 조건을 변경하거나 새로운 프로젝트를 등록해보세요.
          </p>
        </div>
      )}

      {/* TODO: 향후 추가 기능들
      
      === 인증 및 사용자 관리 ===
      - [ ] NextAuth.js를 통한 GitHub OAuth 로그인 구현
      - [ ] 사용자 프로필 페이지 (기술 스택, 경력, 포트폴리오)
      - [ ] 내가 작성한 모집글 관리 페이지
      - [ ] 지원한 프로젝트 목록 및 상태 관리
      
      === 데이터베이스 연동 ===
      - [ ] Supabase 데이터베이스 스키마 설계
      - [ ] 실시간 데이터 CRUD 작업 구현
      - [ ] 이미지 업로드 (프로젝트 썸네일, 사용자 프로필)
      - [ ] 데이터 캐싱 및 최적화
      
      === 모집 기능 확장 ===
      - [ ] 프로젝트 상세 페이지 (README, 기술 문서, 진행 상황)
      - [ ] 팀원 지원 시스템 (지원서 작성, 승인/거절)
      - [ ] 프로젝트 북마크/관심 표시 기능
      - [ ] 모집글 수정/삭제 권한 관리
      - [ ] 프로젝트 카테고리 분류 (웹, 앱, AI, 게임 등)
      
      === 소통 및 협업 ===
      - [ ] 팀 채팅/메시징 시스템
      - [ ] 댓글 및 Q&A 시스템
      - [ ] 알림 시스템 (지원자 도착, 마감 임박 등)
      - [ ] 실시간 온라인 상태 표시
      
      === 프로젝트 관리 ===
      - [ ] 칸반 보드 스타일 프로젝트 진행 상황 관리
      - [ ] 마일스톤 및 일정 관리
      - [ ] 파일 공유 시스템
      - [ ] Git 저장소 연동
      
      === 검색 및 추천 ===
      - [ ] 고급 검색 (지역, 기간, 난이도, 보상 여부)
      - [ ] AI 기반 프로젝트 추천 시스템
      - [ ] 유사한 기술 스택의 프로젝트 추천
      - [ ] 검색 기록 및 최근 본 프로젝트
      
      === 평가 및 피드백 ===
      - [ ] 프로젝트 완료 후 팀원 상호 평가 시스템
      - [ ] 포트폴리오 연동 및 성과 기록
      - [ ] 리뷰 및 추천 시스템
      - [ ] 실력 레벨 및 뱃지 시스템
      
      === 분석 및 통계 ===
      - [ ] 프로젝트 성공률 통계
      - [ ] 인기 기술 스택 트렌드 분석
      - [ ] 사용자 활동 분석 대시보드
      - [ ] 모집 성공률 및 최적 팀 구성 분석
      
      === 커뮤니티 기능 ===
      - [ ] 멘토링 시스템 (선배 개발자 - 신입 개발자)
      - [ ] 기술 블로그/아티클 공유
      - [ ] 이벤트 및 스터디 모임 관리
      - [ ] 개발자 네트워킹 이벤트 캘린더
      
      === 보안 및 안정성 ===
      - [ ] 스팸 및 악성 게시글 필터링
      - [ ] 사용자 신고 시스템
      - [ ] 데이터 백업 및 복구 시스템
      - [ ] API 레이트 리미팅
      
      */}

      {/* 모집글 작성 모달 */}
      <RecruitmentCreateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddPost}
      />
    </StandardPageLayout>
  );
}
